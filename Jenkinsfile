pipeline {
    agent any

    environment {
        NVM_DIR = "${HOME}/.nvm"
        NODE_VERSION = '20'
    }

    stages {
        stage('Setup Node.js') {
            steps {
                sh '''
                    # Install NVM if not present
                    if [ ! -d "$NVM_DIR" ]; then
                        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
                    fi
                    
                    # Load NVM
                    . $NVM_DIR/nvm.sh
                    
                    # Install and use Node.js
                    nvm install ${NODE_VERSION}
                    nvm use ${NODE_VERSION}
                    
                    # Verify Node.js version
                    node --version
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                    . $NVM_DIR/nvm.sh
                    npm install
                '''
            }
        }

        stage('Unit Tests') {
            steps {
                sh '''
                    . $NVM_DIR/nvm.sh
                    npm test tests/
                '''
            }
        }

        stage('UI Tests') {
            steps {
                sh '''
                    . $NVM_DIR/nvm.sh
                    npm run test:ui
                '''
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
        always {
            cleanWs()
        }
    }
}