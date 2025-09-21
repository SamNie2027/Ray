pipeline {
    agent {
        docker {
            image 'node:20' // Node.js 20
            args '-u root' // needed to install packages
        }
    }
    
    environment {
        AWS_CREDS = credentials('aws-creds')
        AWS_REGION = 'us-east-1'
        AWS_ECR_ENDPOINT = '634615501908.dkr.ecr.us-east-1.amazonaws.com/ray'
    }

    stages {
        stage('Setup') {
            steps {
                sh '''
                    # Install AWS CLI
                    curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
                    unzip awscliv2.zip
                    sudo ./aws/install

                    export AWS_ACCESS_KEY_ID=$AWS_CREDS_USR
                    export AWS_SECRET_ACCESS_KEY=$AWS_CREDS_PSW
                    
                    cd backend
                    npm install
                '''
            }
        }

        stage('Test') {
            steps {
                sh '''
                    cd backend
                    npm test
                '''
            }
        }

        stage('Build and Deploy') {
            steps {
                sh '''
                    cd backend
                    sudo docker compose build --no-cache
                    aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ECR_ENDPOINT
                    docker tag ray-backend:latest $AWS_ECR_ENDPOINT:latest
                    docker push $AWS_ECR_ENDPOINT:latest
                '''
            }
        }
    }
}
