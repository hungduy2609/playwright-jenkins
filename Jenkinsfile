pipeline{
    agent any
    stages{
        stage("Clone"){
            steps{
                git 'https://github.com/hungduy2609/playwright-jenkins.git'
            }
        }
        stage('Install playwright') {
            steps {
                sh 'npm install'
                sh 'npx playwright install'
            }
        }
        stage("Run test"){
            steps{
                sh 'npm run allure:clear'
                sh 'npm run run-all'
            }
        }
        stage("Publish Report"){
            steps{
                publishHTML (target : [allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'reports',
                    reportFiles: 'myreport.html',
                    reportName: 'My Reports',
                    reportTitles: 'The Report'])
            }
        }
    }
}