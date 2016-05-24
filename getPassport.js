var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

var mongoose = require('mongoose');
var User = mongoose.model(
    'User',
    new mongoose.Schema({
        facebook: {id: String}
    })
);

passport.use(new FacebookStrategy(
    {
        clientID: 173388723062737,
        clientSecret: 'b701af3817f00ac891c90958a68ab933',
        callbackURL: "http://www.example.com/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        User.findOne({
            'facebook.id': profile.id 
        }, function(err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                user = new User({
                    facebook: profile._json
                });
                user.save(function(err) {
                    if (err) console.log(err);
                    return done(err, user);
                });
            } else {
                return done(err, user);
            }
        });
    }
));

module.exports = passport;