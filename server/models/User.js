var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        index: true
    },
    lastName: {
        type: String,
        index: true
    },
    email: {
        type: String,
        index: true
    },
    gender: {
        type: String,
        index: true
    },
    age: {
        type: Number,
        index: true
    },
    avatar: {
        type: String,
        index: true
    },
    aboutMe: {
        type: String,
        index: true
    },
    active: Boolean
    // owner_id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     index: true
    // }
}, {collection: 'users'});

var User = mongoose.model('User', UserSchema);

module.exports = {
    User: User
};