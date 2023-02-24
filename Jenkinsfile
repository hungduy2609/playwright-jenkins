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
                sh 'npm run run-all'
            }
            post{
                success{
                    archiveArtifacts(artifacts: 'result.png', followSymlinks: false)
                }
            }
        }
    }
}