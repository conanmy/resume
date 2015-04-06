var express = require('express');
var app = express();

app.use(require('serve-static')(__dirname + '/client'));
app.use(require('morgan')('dev'));
app.use(require('body-parser')());
app.use(require('method-override')());

app.set('port', (process.env.PORT || 5000));

var uri = 'mongodb://heroku_app35600204:1hmpef50cnirkmbji8atkp9jk2@ds061691.mongolab.com:61691/heroku_app35600204';

var mongodb = require('mongodb');

mongodb.MongoClient.connect(uri, function(err, db) {
    var resumes = db.collection('resumes');
    app.get('/resume/all', function(req, res) {
        resumes.find().toArray(function(err, resumes) {
            if (err) {
                res.send(err);
            }
            console.log(resumes);
            res.json(resumes);
        });
    });

    app.post('/resume/all', function(req, res) {
        console.log(req.body);
        resumes.insert(req.body, function(err, resume) {});
    });
});

app.listen(app.get('port'), function(){
    console.log('App listening on port ' + app.get('port'));
});