pipeline {
    agent any     
    stages {
        stage('Git Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/kirans3989/weather-app.git'
            }
        }
        stage('Build Backend node image') {
            steps {
                script {
                    withDockerRegistry(credentialsId: 'dockerhub', toolName: 'docker') {
                        sh 'docker build -t kiranks998/backend-node:latest .'
                    }
                }
            }
        }

        stage('Docker Push Backend Image') {
            steps {
                script {
                    withDockerRegistry(credentialsId: 'dockerhub', toolName: 'docker') {
                        sh 'docker push kiranks998/backend-node:latest'
                    }
                }
            }
        }
        stage('Build Frontend image') {
            steps {
                script {
                    withDockerRegistry(credentialsId: 'dockerhub', toolName: 'docker') {
                        sh 'docker build -t kiranks998/frontend:latest -f server/Dockerfile  server/'
                    }
                }
            }
        }

        stage('Docker Push Frontend Image') {
            steps {
                script {
                    withDockerRegistry(credentialsId: 'dockerhub', toolName: 'docker') {
                        sh 'docker push kiranks998/frontend:latest'
                    }
                }
            }
        }

        stage('Deploying React.js container to Kubernetes') {
            steps {
                container('kubectl') {
                sh 'export PATH=$PATH:/path/to/kubectl-directory'
                sh 'kubectl --kubeconfig=$KUBECONFIG apply -f backendnodejs-deployment.yaml'
                sh 'kubectl --kubeconfig=$KUBECONFIG apply -f frotend-deployment.yaml'
       }
     }

     }



    }
}

