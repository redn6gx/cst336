var express = require('express');
var router = express.Router();

//A
router.get('/', function(req, res, next) {
  res.render('index', 
  { 
      title: 'The title',
      message: 'It just works!'
  });
});

//B
router.post("/index.js", function(data, status) {
    alert("Data: " + data + "\nStatus: " + status);
});

module.exports = router;