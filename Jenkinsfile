pipeline {
    agent any

    stages {
        stage('Clone Branches') {
            steps {
               bat 'git pull origin ui'
               bat 'git pull origin middleware'
            }
        }
        stage('NPM Install for UI') {
            steps {
                bat 'cd ui'
                bat 'npm install'
            }
        }
        stage('NPM Install for Middleware') {
            steps {
                bat 'cd ..\middleware'
                bat 'npm install'
            }
        }
        stage('Launch Middleware') {
            steps {
                bat 'npm run dev'
            }
        }
        stage('Launch MongoDB') {
            steps {
                bat 'cd ..\ui'
                bat 'ng serve --open'
            }
        }
    }
}