pipeline {
    agent any

    environment {
        NODE_VERSION = '20'
        NVM_DIR = "${HOME}/.nvm"
    }

    stages {
        stage('Setup Node.js') {
            steps {
                sh '''
                    # Install required packages
                    sudo apt-get update
                    sudo apt-get install -y curl build-essential chromium-browser chromium-chromedriver \
                    libgbm-dev libatk-bridge2.0-0 libgtk-3-0 libnss3 libx11-xcb1 libxcb-dri3-0 \
                    libxcomposite1 libxcursor1 libxdamage1 libxfixes3 libxi6 libxrandr2 libxss1 \
                    libxtst6 fonts-liberation xvfb

                    # Install NVM if not present
                    if [ ! -d "$NVM_DIR" ]; then
                        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
                    fi
                    
                    # Load NVM and install Node.js
                    . $NVM_DIR/nvm.sh
                    nvm install ${NODE_VERSION}
                    nvm use ${NODE_VERSION}
                    
                    # Verify versions
                    node --version
                    npm --version
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
                    xvfb-run --server-args="-screen 0 1280x960x24" npm run test:ui
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