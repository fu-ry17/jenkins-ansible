pipeline {
    agent any

    tools {
        nodejs 'Node.js 20.x'
    }

    stages {
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
            junit '**/junit.xml'
        }
    }
}