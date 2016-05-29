var express = require('express');
var passport = require('passport');

var app = express();
var bodyParser = require('body-parser');
app.use(require('cookie-parser')());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(require('serve-static')(__dirname + '/../client'));

app.set('port', (process.env.PORT || 5000));

var dburi;
if (app.get('env') === 'production') {
    dburi = process.env.MONGOLAB_URI;
} else {
    dburi = 'mongodb://admin:mayue1225@ds011943.mlab.com:11943/myresume-dev';
}
var mongoose = require('mongoose');
mongoose.connect(dburi);

require('./passport').init();
app.use(require('./controllers/auth'));
app.get('/user/', function(req, res) {
    res.json(req.user);
});
app.use(function(req, res, next) {
    if (!req.user) {
        res.status(500).send('No valid user info.');
    } else {
        next();
    }
});
app.use(require('./controllers/resume'));

app.listen(app.get('port'), function(){
    console.log('App listening on port ' + app.get('port'));
});