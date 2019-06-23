const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    fname: String,
    lname: String,    
    ssoid: String,
    email: String,
});

module.exports = mongoose.model('user', UserSchema);