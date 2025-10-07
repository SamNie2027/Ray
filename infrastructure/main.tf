provider "aws" {
  region = "us-east-1"
}

# ------------------------------
# Aurora Cluster (Serverless v2)
# ------------------------------
resource "aws_rds_cluster" "aurora" {
  cluster_identifier = "ray-aurora-cluster"

  engine         = "aurora-mysql"

  database_name   = "raydb"
  master_username = "user"
  master_password = "supersecurepassword"

  backup_retention_period = 1
  storage_encrypted       = true
  deletion_protection     = false

  # 👇 Required for Serverless v2
  serverlessv2_scaling_configuration {
    min_capacity = 0.5  # minimum Aurora Capacity Units (set 0.5 or 0)
    max_capacity = 1    # maximum Aurora Capacity Units
  }

  # optional: specify your subnets or security groups if needed
  # db_subnet_group_name = aws_db_subnet_group.db_subnet_group.name
  # vpc_security_group_ids = [aws_security_group.db_sg.id]
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
