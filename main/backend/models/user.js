const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 6,
        match: /^[a-zA-Z0-9]+$/
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 10
    }
});

module.exports = mongoose.model('User', userSchema);

