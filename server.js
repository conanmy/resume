var express = require('express');
var passport = require('passport');
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});
var FacebookStrategy = require('passport-facebook').Strategy;

var app = express();
var bodyParser = require('body-parser');
app.use(require('serve-static')(__dirname + '/client'));
app.use(require('cookie-parser')());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.set('port', (process.env.PORT || 5000));

var dburi;
if (app.get('env') === 'production') {
    dburi = process.env.MONGOLAB_URI;
} else {
    dburi = 'mongodb://admin:mayue1225@ds011943.mlab.com:11943/myresume-dev';
}

var mongoose = require('mongoose');
mongoose.connect(dburi);
var Schema = mongoose.Schema;
var Resume = mongoose.model(
    'Resume',
    new Schema({
        title: String,
        name: String,
        email: String,
        exp: [{text: String}]
    })
);

var User = mongoose.model(
    'User',
    new Schema({
        facebookId: String
    })
);
passport.use(
    new FacebookStrategy({
        clientID: 173388723062737,
        clientSecret: 'b701af3817f00ac891c90958a68ab933',
        callbackURL: "/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        // asynchronous
        process.nextTick(function() {

            // find the user in the database based on their facebook id
            User.findOne({ 'facebook.id' : profile.id }, function(err, user) {

                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err)
                    return done(err);

                // if the user is found, then log them in
                if (user) {
                    return done(null, user); // user found, return that user
                } else {
                    // if there is no user found with that facebook id, create them
                    var newUser            = new User();

                    // set all of the facebook information in our user model
                    newUser.facebook.id    = profile.id; // set the users facebook id                   
                    newUser.facebook.token = token; // we will save the token that facebook provides to the user                    
                    newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
                    newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

                    // save our user to the database
                    newUser.save(function(err) {
                        if (err)
                            throw err;

                        // if successful, return the new user
                        return done(null, newUser);
                    });
                }

            });
        });
    }
));

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/#/');
    }
);

app.get('/resumes/', function(req, res) {
    Resume.find({}, function(err, resumes) {
        if (err) {
            res.send(err);
        }
        res.json(resumes);
    });
});

app.get('/resumes/:resumeId', function(req, res) {
    Resume.findOne({
        _id: req.params.resumeId
    }, function(err, resume) {
        if (err) {
            res.send(err);
        }
        res.json(resume);
    });
});

app.post('/resumes/', function(req, res) {
    var newResume = new Resume(req.body);
    console.log(newResume);
    newResume.save(function(err, resume) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        res.json(resume);
    });
});

app.put('/resumes/:resumeId', function(req, res) {
    Resume.findOneAndUpdate(
        {
            _id: req.body._id
        }, 
        {
            $set: req.body
        }, 
        function(err, resume) {
            if (err) {
                res.send(err);
            }
            res.json(resume);
        }
    );
});

app.delete('/resumes/:resumeId', function(req, res) {
    Resume.findOneAndRemove(
        {
            _id: req.params.resumeId
        },
        {},
        function(err, resume) {
            if (err) {
                res.send(err);
            }
            res.json(resume);
        }
    );
});

app.listen(app.get('port'), function(){
    console.log('App listening on port ' + app.get('port'));
});