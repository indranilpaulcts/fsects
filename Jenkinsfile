pipeline {
    agent any

    stages {
        stage('Clone') {
            steps {
               bat 'git pull origin ui'
               bat 'git pull origin middleware'
            }
        }
        stage('Test') {
            steps {
                bat 'dir'
            }
        }
        stage('Deploy') {
            steps {
                bat 'dir'
            }
        }
    }
}