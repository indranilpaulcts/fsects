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
                dir("${JENKINS_HOME}\\workspace\\fsectsproject_master\\ui"){
                    bat 'npm install'
                } 
            }
        }
        stage('NPM Install for Middleware') {
            steps {
                dir("${JENKINS_HOME}\\workspace\\fsectsproject_master\\middleware"){
                    bat 'npm install'
                }                
            }
        }        
        stage('Test for UI') {
            steps {
                dir("${JENKINS_HOME}\\workspace\\fsectsproject_master\\ui"){
                    bat 'npm test'
                }
            }
        }
        stage('Test for Middleware') {
            steps {
                dir("${JENKINS_HOME}\\workspace\\fsectsproject_master\\middleware"){
                    bat 'npm start'
                }                
            }
        }
    }
}