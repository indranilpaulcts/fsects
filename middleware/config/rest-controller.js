const User = require('../models/user-model.js');

// Creates a new user (Insert into mongodb collection)
// Called by the post method (API: /add-user)
exports.create = (req, res) => {
    if(!req.body){
        return res.status(400).send({
            message: "User object is empty!"
        });
    }

    const user = new User({
        fname: req.body.fname || "Untitled",
        lname: req.body.lname || "Untitled",  
        ssoid: req.body.ssoid || "Untitled",
        email: req.body.email || "Untitled",
    });

    user.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Some error occurred during DB operation!'
        });
    });
};

// Retrieve all users - called by the get method
exports.findAll = (req, res) => {

    User.find()
    .then(user => {
        res.send(user);
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Some error occurred during DB operation!'
        });
    });
};

// Retrieve a single user identified by id - called by the get method
exports.findOne = (req, res) => {
    User.findById = (req.params.id)
    .then(user => {
        if(!user){
            return res.status(404).send({
                message: "User not found with ID " + req.params.id
            });
        }
        res.send(user);
    }).catch( err => {
        res.status(500).send({
            message: err.message || 'Some error occurred during DB operation!'
        });
    });

};

// Update a user with identified by id - called by the put method
exports.update = (req, res) => {

};
