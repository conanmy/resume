var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Resume = mongoose.model(
    'Resume',
    new mongoose.Schema({
        title: String,
        name: String,
        email: String,
        exp: [{text: String}],
        userId: String
    })
);

router.get('/resumes/', function(req, res) {
    Resume.find({userId: req.user._id}, function(err, resumes) {
        if (err) {
            res.send(err);
        }
        res.json(resumes);
    });
});

router.get('/resumes/:resumeId', function(req, res) {
    Resume.findOne({
        _id: req.params.resumeId
    }, function(err, resume) {
        if (err) {
            res.send(err);
        }
        res.json(resume);
    });
});

router.post('/resumes/', function(req, res) {
    req.body.userId = req.user._id;
    var newResume = new Resume(req.body);
    newResume.save(function(err, resume) {
        if (err) {
            res.send(err);
        }
        res.json(resume);
    });
});

router.put('/resumes/:resumeId', function(req, res) {
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

router.delete('/resumes/:resumeId', function(req, res) {
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

module.exports = router;