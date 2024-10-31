pipeline {
    agent any

    tools {
        nodejs 'Node.js'
    }

    environment {
        ANSIBLE_PLAYBOOK_PATH = "/etc/ansible/deploy-node-app.yml"
        ANSIBLE_INVENTORY_PATH = "/etc/ansible/hosts"
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
                            -i ${ANSIBLE_INVENTORY_PATH} \
                            ${ANSIBLE_PLAYBOOK_PATH} \
                            -e "project_root=${WORKSPACE}" \
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