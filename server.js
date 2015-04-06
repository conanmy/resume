var express = require('express');
var app = express();

app.use(require('serve-static')(__dirname + '/client'));
app.use(require('morgan')('dev'));
app.use(require('body-parser')());
app.use(require('method-override')());

var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
/*数据库连接信息host,port,user,pwd*/
var db_name = 'hIAiNlggtmLPkZsbURBV';  // 数据库名，从云平台获取
var db_host =  'mongo.duapp.com';  // 数据库地址
var db_port =  '8908';  // 数据库端口
var username = 'connamy';  // 用户名（API KEY）
var password = 'cooldown';  // 密码(Secret KEY)

var db = new Db(db_name, new Server(db_host, db_port, {}), {w: 1});

db.open(function(err, db) {
    db.authenticate(username, password, function(err, result) { 
        if (err) {
            db.close();
            res.end('Authenticate failed!');
            return;   
        }
        db.collection('resumes', function(err, collection) {
            
        }); 
    });
});

app.get('/resume/all', function(req, res) {
    db.get('resumes').find(function(err, resumes) {
        if (err) {
            res.send(err);
        }
        res.json(resumes);
    });
});

app.post('/resume/all', function(req, res) {
    db.get('resumes').insert(req.body, function(err, resume) {
        if (err) {
            res.send(err);
        }
    });
});

app.listen(18080, function(){
    console.log('App listening on port 18080');
});