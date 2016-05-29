var passport = require('passport');
var mongoose = require('mongoose');
var FacebookStrategy = require('passport-facebook').Strategy;

exports.init = function() {

    var User = mongoose.model(
        'User',
        new mongoose.Schema({
            facebook: {id: String, name: String}
        })
    );

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
    passport.use(
        new FacebookStrategy({
            clientID: 173388723062737,
            clientSecret: 'b701af3817f00ac891c90958a68ab933',
            callbackURL: "/auth/facebook/callback"
        },
        function(accessToken, refreshToken, profile, done) {
            process.nextTick(function() {
                User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
                    if (err) {
                        return done(err);
                    }
                    if (user) {
                        return done(null, user);
                    } else {
                        var newUser = new User();
                        newUser.facebook.id = profile.id;                  
                        newUser.facebook.name = profile.displayName;
                        newUser.save(function(err) {
                            if (err) {
                                throw err;
                            }
                            return done(null, newUser);
                        });
                    }
                });
            });
        }
    ));
};