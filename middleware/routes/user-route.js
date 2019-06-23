module.exports = (app) => {
    const api = require('../config/rest-controller.js');

    // Create a new user
    app.post('/add-user', api.create);

    // Retrieve all users
    app.get('/get-user', api.findAll);

    // Update a user with id
    app.put('/upd-user/:id', api.update);
}