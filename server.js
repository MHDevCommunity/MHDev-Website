// Node modules
var express = require('express');
var cors = require('cors');
var request = require('request');
var bodyParser = require('body-parser');
var crypto = require('crypto');

// App modules
var mysql_connection = require('./models/connect');
require('./config');

var app = express();
app.use(cors());
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/dist'));
app.set('views', __dirname + '/dist');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


app.get("/get-articles", function (req, res) {
  mysql_connection.query('SELECT * FROM articles', function(err, result) {
    if (err) console.log(err);
    res.send(result);
  });
});

app.get("/get-resources", function (req, res) {
  mysql_connection.query('SELECT * FROM resources', function(err, result) {
    if (err) console.log(err);
    res.send(result);
  });
});

app.post("/register-user", function (req, res) {
  request({ url: 'https://api.github.com/users/' + req.body.username, headers: { 'User-Agent': 'node.js' } }, function (error, response, body) {
    var bodyObject = JSON.parse(body);

    if (bodyObject.message == 'Not Found') { res.send({ code: 404, message: 'Could not find GitHub user' }); }

    var hashedPassword = crypto.createHash("md5").update(req.body.password).digest('hex');

    var userData = {
      'id': bodyObject.id,
      'name': bodyObject.name,
      'login': bodyObject.login,
      'avatar_url': bodyObject.avatar_url,
      'blog': bodyObject.blog,
      'location': bodyObject.location,
      'company': bodyObject.company,
      'bio': bodyObject.bio,
      'email': bodyObject.email,
      'html_url': bodyObject.html_url,
      'password': hashedPassword
    };

    if (response.statusCode == 200) {
      mysql_connection.query('INSERT INTO users SET ?', userData, function(err, result) {
        if (err) { res.send({ code: err.code, message: 'This username is already registered' }); }
        else { res.send({ code: 200, data: { username: userData.login, password: hashedPassword } }); }
      });
    }
  });
});

app.post("/login-user", function (req, res) {
  if (req.body.hashed !== true) { req.body.password = crypto.createHash("md5").update(req.body.password).digest('hex'); }

  mysql_connection.query('SELECT * FROM users WHERE login = ? AND password = ?', [req.body.username, req.body.password], function(err, result) {
    if (err || result.length === 0) { res.send({ code: 404, message: 'User not found' }); }
    else { res.send({ code: 200, data: result }); }
  });
});

app.get("/get-repos", function (req, res) {
  request({ url: 'https://api.github.com/users/MHDevCommunity/repos?client_id=' + process.env.GITHUB_CLIENT + '&client_secret=' + process.env.GITHUB_SECRET, headers: { 'User-Agent': 'node.js' } },function (error, response, body) {
    res.send({ code: 200, data: JSON.parse(body) });
  });
});

app.get("/get-repo-history/:repo", function (req, res) {
  request({ url: 'https://api.github.com/repos/MHDevCommunity/' + req.params.repo + '/commits?client_id=' + process.env.GITHUB_CLIENT + '&client_secret=' + process.env.GITHUB_SECRET, headers: { 'User-Agent': 'node.js' } },function (error, response, body) {
    res.send({ code: 200, data: JSON.parse(body) });
  });
});

app.get("/get-open-issues/:repo", function (req, res) {
  request({ url: 'https://api.github.com/repos/MHDevCommunity/' + req.params.repo + '/issues?client_id=' + process.env.GITHUB_CLIENT + '&client_secret=' + process.env.GITHUB_SECRET, headers: { 'User-Agent': 'node.js' } },function (error, response, body) {
    res.send({ code: 200, data: JSON.parse(body) });
  });
});

app.get("/get-readme/:repo", function (req, res) {
  request({ url: 'https://api.github.com/repos/MHDevCommunity/' + req.params.repo + '/contents/README.md?client_id=' + process.env.GITHUB_CLIENT + '&client_secret=' + process.env.GITHUB_SECRET, headers: { 'User-Agent': 'node.js' } },function (error, response, body) {
    res.send({ code: 200, data: JSON.parse(body) });
  });
});

app.get('*', function (req, res) { res.render('index.html'); });

app.listen(process.env.PORT || 5000);
