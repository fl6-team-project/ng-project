var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({"id": Number, "firstName": String, "lastName": String,
    "email": String, "gender": String, "age": Number, "avatar": String, "aboutMe": String}, {collection: 'users'});
mongoose.connect("mongodb://localhost:27017/testDB");
var db = mongoose.connection;
var Users = mongoose.model('User', userSchema);

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
    Users.find({}, function(err, users) {
      if (err) throw err;
      res.json(users);
    });
});

module.exports = router;
