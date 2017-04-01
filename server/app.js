var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/index');

//!!! Connect to BD

var mongoose = require('mongoose');
var uri = 'mongodb://admin:admin@ds135830.mlab.com:35830/epamportal'; // - Main
// var uri = 'mongodb://test:test@ds137550.mlab.com:37550/sandbox'; // - Test
mongoose.connect(uri);
var db = mongoose.connection.db;

// db.on('error', function (err) {
//     log.error('connection error:', err.message);
// });
// db.once('open', function callback () {
//     log.info("Connected to DB!");
// });

var routes = require('./routes/routes');

var app = express();

//!!! Connect to BD in separate file - routes.js

// view engine setup
app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

// New Error
app.use(require('./middleware/sendHttpError'));
//middleware for cookies
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
app.use(session({
  secret: 'NewHe11S3cr3t',
  key: 'sid',
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: null
  },
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    url: uri
  })
}));

var loadUser = require('./middleware/loadUser');
var checkAuth = require('./middleware/checkAuth');

// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('../client/dist'));

app.use('/', index);
// app.use(loadUser);
// app.use(checkAuth);
app.use('/api', routes);

// app.use('/api/users', users);
// app.use('/api/teachers', teachers);
// app.use('/api/lectures', lectures);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
