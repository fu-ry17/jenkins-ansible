pipeline {
    agent any

    tools {
        nodejs 'Node.js'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Run Unit Tests') {
            steps {
                sh 'npm run test'
            }
        }

        stage('Run UI Tests') {
            steps {
                sh 'npm run test:ui'
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            echo 'All tests passed!'
        }
        failure {
            echo 'Tests failed! Check the logs for more information.'
        }
    }
}