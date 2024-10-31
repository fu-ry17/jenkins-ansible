pipeline {
    agent any

    tools {
        nodejs 'Node.js'
    }

    environment {
        ANSIBLE_PLAYBOOK_PATH = "/etc/ansible/deploy-node-app.yml"
        JENKINS_HOME = "/var/lib/jenkins"
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

        stage('Run Ansible Playbook') {
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: 'ansible-ssh-key', keyFileVariable: 'SSH_KEY')]) {
                    sh '''
                        ansible-playbook \
                            -i /etc/ansible/inventory.ini \
                            ${ANSIBLE_PLAYBOOK_PATH} \
                            -e "project_root=${WORKSPACE}" \
                            --private-key=${SSH_KEY} \
                            -vv
                    '''
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            echo 'Deployment successful!'
        }
        failure {
            echo 'Deployment failed! Check the logs for more information.'
        }
    }
}