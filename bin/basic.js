var express = require('express');
var app = express();

// app.use('/', function (req, res, next) {


app.use('/', function (req, res, next) {
   res.send('<h1>hello world</h1>');
});

const port = 8080;

console.log("listening on " + port);

app.listen(8080);
