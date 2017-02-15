// Node modules
var express = require('express');
var cors = require('cors');

// App modules
var mysql_connection = require('./models/connect');

var app = express();
app.use(cors());
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

app.get('*', function (req, res) { res.render('index.html'); });

app.listen(process.env.PORT || 3009);
