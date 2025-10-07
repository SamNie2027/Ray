# CALL AFTER TERRAFORM TO MAKE SURE SCALING IS MINIMIZED
aws rds modify-db-cluster \
  --db-cluster-identifier ray-aurora-cluster \
  --serverless-v2-scaling-configuration MinCapacity=0.5,MaxCapacity=1 \
  --apply-immediately
