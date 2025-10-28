pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-cred')
        DOCKERHUB_USERNAME = "gopinathgb"
        FRONTEND_IMAGE = "frontend-movie"
        BACKEND_IMAGE = "backend-movie"
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code from GitHub...'
                git(
                    url: 'https://github.com/gopi-ganesan/dev.git',
                    branch: 'master',
                    credentialsId: 'github-token'
                )
            }
        }

        stage('Build Docker Images') {
            steps {
                dir('Movie-App-master') {
                    echo 'Building Docker images...'
                    sh 'docker-compose -f docker-compose.yml build'
                }
            }
        }

        stage('Push to DockerHub') {
            steps {
                dir('Movie-App-master') {
                    echo 'Pushing Docker images to DockerHub...'
                    sh '''
                        echo "${DOCKERHUB_CREDENTIALS_PSW}" | docker login -u "${DOCKERHUB_CREDENTIALS_USR}" --password-stdin

                        docker tag movie-frontend:M1 ${DOCKERHUB_USERNAME}/${FRONTEND_IMAGE}:M2
                        docker tag movie-backend:M1 ${DOCKERHUB_USERNAME}/${BACKEND_IMAGE}:M2

                        docker push ${DOCKERHUB_USERNAME}/${FRONTEND_IMAGE}:M2
                        docker push ${DOCKERHUB_USERNAME}/${BACKEND_IMAGE}:M2
                    '''
                }
            }
        }

        stage('Deploy Containers') {
            steps {
                dir('Movie-App-master') {
                    echo 'Deploying containers using docker-compose...'
                    sh 'docker-compose -f docker-compose.yml up -d'
                }
            }
        }
    }

    post {
        success {
            echo 'The pipeline has succeeded!'
            mail to: 'gopinathgopinath0154@gmail.com',
                 subject: " Jenkins SUCCESS - ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                 body: "The Jenkins build was successful.\n\nView details: ${env.BUILD_URL}"
        }

        failure {
            echo 'The pipeline has failed!'
            mail to: 'gopinathgopinath0154@gmail.com',
                 subject: " Jenkins FAILED - ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                 body: "The Jenkins build failed.\n\nCheck logs: ${env.BUILD_URL}"
        }
    }
}
