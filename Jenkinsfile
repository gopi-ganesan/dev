pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-cred')
        DOCKERHUB_USERNAME = "gopinathgb"
        IMAGE_NAME = "frontend-movie"
        TAG = "c3"
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

        stage('Build Docker Image with Compose') {
            steps {
                echo 'Building Docker image using docker-compose...'
                sh 'docker-compose build'
            }
        }

        stage('Push to DockerHub') {
            steps {
                echo 'Pushing image to DockerHub...'
                sh '''
                    echo "${DOCKERHUB_CREDENTIALS_PSW}" | docker login -u "${DOCKERHUB_CREDENTIALS_USR}" --password-stdin
                    docker push ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:${TAG}
                '''
            }
        }

        stage('Deploy Container') {
            steps {
                echo 'Deploying container using docker-compose...'
                sh '''
                    docker-compose down
                    docker-compose up -d
                '''
            }
        }
    }

    post {
        success {
            echo ' Pipeline succeeded! React app deployed using Docker Compose.'
            mail to: 'gopinathgopinath0154@gmail.com',
                 subject: " Jenkins SUCCESS - ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                 body: "The Jenkins build was successful.\n\nView details: ${env.BUILD_URL}"
        }

        failure {
            echo ' Pipeline failed!'
            mail to: 'gopinathgopinath0154@gmail.com',
                 subject: "Jenkins FAILED - ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                 body: "The Jenkins build failed.\n\nCheck logs: ${env.BUILD_URL}"
        }
    }
}

