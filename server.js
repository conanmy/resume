var express = require('express');
var app = express();

app.use(require('serve-static')(__dirname + '/client'));
app.use(require('morgan')('dev'));
app.use(require('body-parser')());
app.use(require('method-override')('X-HTTP-Method-Override'));

app.set('port', (process.env.PORT || 5000));

var uri = 'mongodb://heroku_app35600204:1hmpef50cnirkmbji8atkp9jk2@ds061691.mongolab.com:61691/heroku_app35600204';

var mongodb = require('mongodb');

mongodb.MongoClient.connect(uri, function(err, db) {
    var resumes = db.collection('resumes');
    app.get('/resumes/', function(req, res) {
        resumes.find().toArray(function(err, resumes) {
            if (err) {
                res.send(err);
            }
            res.json(resumes);
        });
    });

    app.get('/resumes/:resumeId', function(req, res) {
        console.log(req.params.resumeId);
        resumes.findOne({
            '_id': new mongodb.BSONPure.ObjectID(req.params.resumeId)
        }, function(err, resume) {
            if (err) {
                res.send(err);
            }
            res.json(resume);
        });
    });

    app.post('/resumes/', function(req, res) {
        resumes.insert(req.body, function(err, resume) {
            if (err) {
                res.send(err);
            }
        });
    });

    app.put('resumes/:resumeId', function() {
        res.send('ok');
    });

    app.delete('/resumes/:resumeId', function(req, res) {
        resumes.remove({
            '_id': new mongodb.BSONPure.ObjectID(req.params.resumeId)
        }, function(err, resume) {
            if (err) {
                res.send(err);
            }
        });
    });
});

app.listen(app.get('port'), function(){
    console.log('App listening on port ' + app.get('port'));
});