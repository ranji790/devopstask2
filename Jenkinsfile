pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = 'ranji790/devopstask2'
        IMAGE_TAG = "${env.BUILD_NUMBER}"
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code from repository...'
                checkout scm
            }
        }
        
        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                script {
                    bat "docker build -t ${DOCKER_IMAGE}:${IMAGE_TAG} -t ${DOCKER_IMAGE}:latest ."
                }
            }
        }
        
        stage('Test') {
            steps {
                echo 'Running tests...'
                script {
                    bat 'node test.js'
                }
            }
        }
        
        stage('Push to Docker Hub') {
            steps {
                echo 'Pushing image to Docker Hub...'
                script {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        bat "docker login -u %DOCKER_USER% -p %DOCKER_PASS%"
                        bat "docker push ${DOCKER_IMAGE}:${IMAGE_TAG}"
                        bat "docker push ${DOCKER_IMAGE}:latest"
                    }
                }
            }
        }
        
        stage('Deploy') {
            steps {
                echo 'Deploying application...'
                script {
                    bat "docker rm -f devopstask2-app || exit 0"
                    bat "docker run -d --name devopstask2-app -p 3000:80 ${DOCKER_IMAGE}:${IMAGE_TAG}"
                }
            }
        }
    }
    
    post {
        success {
            echo "Pipeline completed successfully! Image: ${DOCKER_IMAGE}:${IMAGE_TAG}"
        }
        failure {
            echo 'Pipeline failed. Check the logs above.'
        }
    }
}
