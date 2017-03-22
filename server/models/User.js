var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        index: true,
        required: true
    },
    lastName: {
        type: String,
        index: true,
        required: true
    },
    email: {
        type: String,
        index: true,
        required: true
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
    active: {
        type: Boolean,
        default: true
    }
    // owner_id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     index: true
    // }
}, {collection: 'users'});

var User = mongoose.model('User', UserSchema);

module.exports = {
    User: User
};