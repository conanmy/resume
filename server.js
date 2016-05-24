var express = require('express');
var app = express();

app.use(require('serve-static')(__dirname + '/client'));
app.use(require('morgan')('dev'));
app.use(require('body-parser')());
app.use(require('method-override')());

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