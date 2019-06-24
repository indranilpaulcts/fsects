pipeline {
    agent any

    stages {
        stage('Clone') {
            steps {
                bat 'git config --global user.name "indranilpaulcts"'
                bat 'git config --global user.email "indranil.paul@cognizant.com"'
                bat 'git pull origin master'
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