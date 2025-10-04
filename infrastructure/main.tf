// Note: While this file is functional, RDS compute is expensive. So please do not run unless you understand the costs.

provider "aws" {
  region = "us-east-1"
}

module "rds" {
  source  = "terraform-aws-modules/rds/aws"
  version = "6.12.0"
  identifier = "ray-db"

  engine            = "mysql"
  engine_version    = "5.7"
  instance_class    = "db.t3.micro"

  allocated_storage = 5

  db_name  = "raydb"
  username = "user"
  port     = "3306"

  iam_database_authentication_enabled = true

  create_db_option_group = false
  create_db_parameter_group = false
  auto_minor_version_upgrade = false
}