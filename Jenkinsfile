pipeline {
    agent any

    environment {
        NODE_VERSION = '20.x'
    }

    stages {
        stage('Setup Node.js') {
            steps {
                script {
                    // Install Node.js using nvm or directly
                    sh '''
                        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
                        . ~/.nvm/nvm.sh
                        nvm install ${NODE_VERSION}
                        nvm use ${NODE_VERSION}
                    '''
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Unit Tests') {
            steps {
                sh 'npm test tests/'
            }
        }

        stage('UI Tests') {
            steps {
                sh 'npm run test:ui'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
    }

    post {
        always {
            // Clean up workspace
            cleanWs()
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}