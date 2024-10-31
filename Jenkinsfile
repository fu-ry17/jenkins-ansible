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
                    pnpm install --frozen-lockfile
                '''
            }
        }

        stage('Run Tests') {
            steps {
                sh 'pnpm run test'
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