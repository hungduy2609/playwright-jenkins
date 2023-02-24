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
                sh 'npx playwright test login.test.ts'
            }
        }
        stage("Publish Report"){
            steps{
                publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: false, reportDir: 'C:\AUTOMATION TESTING\report', reportFiles: 'index.html', reportName: 'HTML Report', reportTitles: '', useWrapperFileDirectly: true])
            }
        }
    }
}