var crypto = require('crypto');
var util = require('util');
var async = require('async');
var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        //required: true
    },
    hashedPassword: {
        type: String,
        //required: true
    },
    salt: {
        type: String,
        //required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    firstName: {
        type: String,
        default: 'Unknown',
        index: true,
        // required: true
    },
    lastName: {
        type: String,
        index: true,
        default: 'Unknown'
        // required: true
    },
    email: {
        type: String,
        index: true,
        // required: true
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
        default: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=300%C3%97300&w=300&h=300',
        index: true
    },
    aboutMe: {
        type: String,
        index: true
    },
    active: {
        type: Boolean,
        default: true
    },
    userRole: {
        type: String,
        default: 'user',
        index: true
    },
    lectures: {
        type: Array,
        index: true
    }
    // owner_id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     index: true
    // }
}, {collection: 'users'});

UserSchema.methods.encryptPassword = function (password) {
    return crypto.createHmac('sha256', this.salt).update(password).digest('hex');
};

UserSchema.virtual('password')
    .set(function (password) {
        this._plainPassword = password;
        this.salt = Math.random() + '';
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function () {return this._plainPassword;});

UserSchema.methods.checkPassword = function (password) {
    return this.encryptPassword(password) === this.hashedPassword;
};

UserSchema.statics.authorize = function (username, password, callback) {
    async.waterfall([
        function (callback) {
            User.findOne({username: username}, callback);
        },
        function (user, callback) {
            if (user) {
                if (user.checkPassword(password)) {
                    callback(null, user);
                } else {
                    callback(new AuthError('Wrong password'));
                }
            } else {
                callback();
            }
        }
    ], callback)
};

var User = mongoose.model('User', UserSchema);

function AuthError(message) {
    Error.apply(this, arguments);
    Error.captureStackTrace(this, AuthError);

    this.message = message;
}
util.inherits(AuthError, Error);
AuthError.prototype.name = 'AuthError';

module.exports = {
    User: User,
    AuthError: AuthError
};