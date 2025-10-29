pipeline {
    agent { label 'dev' }

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-cred')
        DOCKERHUB_USERNAME = "gopinathgb"
        IMAGE_NAME = "frontend-movie"
        TAG = "c4"
        IMAGE_FULL_LATEST = "${DOCKERHUB_USERNAME}/${IMAGE_NAME}:latest"
        IMAGE_FULL_TAGGED = "${DOCKERHUB_USERNAME}/${IMAGE_NAME}:${TAG}"
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

        stage('Build with Compose') {
            steps {
                echo 'Building Docker image with docker-compose...'
                sh 'docker-compose -f docker-compose.yml build'
            }
        }

        stage('Tag image') {
            steps {
                echo "Tagging image ${IMAGE_FULL_LATEST} -> ${IMAGE_FULL_TAGGED}"
                sh "docker tag ${IMAGE_FULL_LATEST} ${IMAGE_FULL_TAGGED} || true"
            }
        }

        stage('Login & Push') {
            steps {
                echo 'Logging into Docker Hub and pushing images...'
                sh '''
                  echo "${DOCKERHUB_CREDENTIALS_PSW}" | docker login -u "${DOCKERHUB_CREDENTIALS_USR}" --password-stdin
                  docker push ${IMAGE_FULL_LATEST} || true
                  docker push ${IMAGE_FULL_TAGGED}
                '''
            }
        }

        stage('Deploy with Compose') {
            steps {
                echo 'Deploying with docker-compose...'
                sh '''
                  docker-compose -f docker-compose.yml down || true
                  docker-compose -f docker-compose.yml up -d
                '''
            }
        }
    }

    post {
        success { echo 'Pipeline succeeded — app deployed.' }
        failure { echo 'Pipeline failed — check logs.' }
    }
}
