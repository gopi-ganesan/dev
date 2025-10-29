pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-cred')
        DOCKERHUB_USERNAME = "gopinathgb"
        IMAGE_NAME = "frontend-movie"
        TAG = "c4"
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
                sh 'docker-compose -f docker-compose.yml build'
                sh "docker tag ${IMAGE_NAME}:${TAG} ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:${TAG}"
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
                    docker-compose -f docker-compose.yml down
                    docker-compose -f docker-compose.yml up -d
                '''
            }
        }
    }

    post {
        success {
            echo 'Pipeline succeeded! React app deployed using Docker Compose.'
        }

        failure {
            echo 'Pipeline failed!'
        }
    }
}
