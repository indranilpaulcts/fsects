// This file contains few configurations of the current application.
// The 'db' key holds the Database configurations.
// The 'server' key holds the application specific configurations.

var appConfig = {
    db: {
        url: "mongodb://localhost:27017/fsects",
        dbname: "fsects",
        dbnamefilestore: "userfiles"
    },
    server: {
        host: "localhost",
        port: 5050,
        clienthosturi: "http://localhost:4200"
    }
};

module.exports = appConfig;