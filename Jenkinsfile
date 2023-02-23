// Jenkinsfile (Declarative Pipeline)
pipeline {
    agent any

    stages {
        stage('Install playwright') {
            steps {
                sh 'npm i -D @playwight/test'
                sh 'npx playwright install'
            }
        }
        // stage('Test') {
        //     steps {
        //         sh 'npx playwright test'
        //     }
        // }
        // stage('Deploy') {
        //     steps {
        //         echo 'Deploying....'
        //     }
        // }
    }
}