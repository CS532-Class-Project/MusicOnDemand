const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    passwordHash: {
        type: String
    },
    googleId: {
        type: String,
        unique: true
    },
    googleProfile: {
        type: Object
    },
    googleAccessToken: {
        type: String
    }
});

module.exports = mongoose.model('Users', UserSchema);