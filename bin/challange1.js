var express = require('express');
var app = express();
var random = require('./challange2');

app.use((req, res, next) => {
  req.commandName = random();
  next();
});

app.use('/', function (req, res, next) {
    res.send(`<h1>${req.commandName}</h1>`); //${value} is a template string: 
                                             // the reason for this is that you can only send strings
});

const port = 8080;

console.log("listening on ", port);

app.listen(8080);