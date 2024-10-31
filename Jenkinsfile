pipeline {
    agent any

    tools {
        nodejs 'Node.js'
    }

    stages {
        stage('Setup pnpm') {
            steps {
                sh '''
                    npm install -g pnpm
                    pnpm --version
                '''
            }
        }

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                    pnpm install
                '''
            }
        }

        stage('Run Unit Tests') {
            steps {
                sh 'pnpm run test'
            }
        }

        stage('Run UI Tests') {
            steps {
                sh 'pnpm run test:ui'
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