provider "aws" {
  region = "us-east-1"
}

// Optional: allow a developer IP/CIDR to access the DB for debugging.
// Leave empty to keep no additional ingress rules.
variable "dev_access_cidr" {
  description = "CIDR to allow dev access to DB (set to empty to disable). Example: \"203.0.113.42/32\""
  type        = string
  default     = ""
}

// Use the default VPC in the account/region. Replace oar change if you use a specific VPC.
data "aws_vpc" "default" {
  default = true
}

// Security group for database access from developer IPs (kept minimal).
resource "aws_security_group" "db_sg" {
  name        = "ray-db-sg"
  description = "Security group for developer access to Ray RDS cluster"
  vpc_id      = data.aws_vpc.default.id

  tags = {
    Name = "ray-db-sg"
  }
}

// If you already have existing SGs attached to the cluster that should be preserved,
// list them here (helps avoid accidentally removing access when updating the config).
variable "preserve_sg_ids" {
  type    = list(string)
  default = ["sg-0304696a5b61fbccb"]
}

// Conditional ingress rule: only created when a CIDR is provided.
resource "aws_security_group_rule" "allow_dev_mysql" {
  count             = var.dev_access_cidr != "" ? 1 : 0
  type              = "ingress"
  from_port         = 3306
  to_port           = 3306
  protocol          = "tcp"
  cidr_blocks       = [var.dev_access_cidr]
  description       = "Allow developer CIDR to connect to MySQL"
  security_group_id = aws_security_group.db_sg.id
}

// Generate a strong random password for the DB master user.
resource "random_password" "rds_master_password" {
  length           = 24
  special          = true
  upper            = true
  lower            = true
  numeric          = true
}

# Store the DB credentials in Secrets Manager (username + password JSON).
resource "aws_secretsmanager_secret" "rds_master_secret" {
  name        = "ray/aurora/master"
  description = "Master credentials for the Ray Aurora cluster"
}

resource "aws_secretsmanager_secret_version" "rds_master_secret_version" {
  secret_id     = aws_secretsmanager_secret.rds_master_secret.id
  secret_string = jsonencode({
    username = "user",
    password = random_password.rds_master_password.result
  })
}

# ------------------------------
# Aurora Cluster (Serverless v2)
# ------------------------------
resource "aws_rds_cluster" "aurora" {
  cluster_identifier = "ray-aurora-cluster"

  engine         = "aurora-mysql"

  database_name   = "raydb"
  master_username = "user"
  master_password = random_password.rds_master_password.result

  backup_retention_period = 1
  storage_encrypted       = true
  deletion_protection     = false
  enable_http_endpoint    = true

  # 👇 Required for Serverless v2
  serverlessv2_scaling_configuration {
    min_capacity = 0.5  # minimum Aurora Capacity Units (set 0.5 or 0)
    max_capacity = 1    # maximum Aurora Capacity Units
  }

  # optional: specify your subnets or security groups if needed
  # db_subnet_group_name = aws_db_subnet_group.db_subnet_group.name
  vpc_security_group_ids = concat(var.preserve_sg_ids, [aws_security_group.db_sg.id])
}

# ------------------------------
# Aurora Instance (Serverless v2)
# ------------------------------
resource "aws_rds_cluster_instance" "aurora_instance" {
  identifier         = "ray-aurora-inst-1"
  cluster_identifier = aws_rds_cluster.aurora.id
  instance_class     = "db.serverless"
  engine             = aws_rds_cluster.aurora.engine

  publicly_accessible = false
}
