const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const session = require('express-session');


router.use(session({
    secret: '6wOBwJBStY'
}));


router.get('/', function(req, res, next) {
    res.render('../public/test/views/login', { layout: false });
});

router.get('/dashboard', function(req, res, next) {
    if (req.session && req.session.username && req.session.password) {
        res.render('../public/test/views/index', { layout: false, loggedIn: req.session.username, userId: req.session.userId });
    }
    else {
        delete req.session.password;
        delete req.session.username;
        res.redirect('/test/');
    }
});



router.post('/login', function(req, res, next) {
    var success = false;
    var errorMessage = "";
    var username = req.body.username;
    var password = req.body.password;
    const connection = mysql.createConnection({
        host: 'er7lx9km02rjyf3n.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'onzqd31kk47zcchv',
        password: 's3yj3kaf64b4bsn8',
        database: 'w5wqtsmzbiwz602n'
    });
    connection.connect();
    connection.query(`
SELECT *
FROM test_users
WHERE username = "${username}"
`, function(error, results, fields){
        console.log(results);
        if (error) throw error;
        if (results.length === 0){
            delete req.session.username;
            console.log("username");
            res.json({
               error: "Incorrect username and/or password!"
            });
        }else if (results[0].password !== password){
            delete req.session.username;
            console.log("password");
            res.json({
                error: "Incorrect username and/or password!"
            });
        }else {
            req.session.username = username;
            req.session.password = password;
            req.session.userId = results[0].userId;
            console.log("success");
            console.log(req.session.username);
            console.log(req.session.password);
            res.json({
                success: true,
                loggedIn: req.session.username,
                userId: req.session.userId
            })
        }


    });
    connection.end();


    // if (req.body.username === "admin" && req.body.password === "password1235") {
    //     success = true;
    //     req.session.username = req.body.username;
    //     req.session.password = req.body.password;
    // }
    // else {
    //     delete req.session.username;
    //     errorMessage = "Incorrect username and/or password!";
    // }

    // res.json({
    //     success: success,
    //     error: errorMessage
    // });
});

router.get('/logout', function(req, res, next) {
    var message = "";
    if (req.session && req.session.username) {
        delete req.session.username;
        if (req.session.password) {
            delete req.session.password;
        }
    }
    else {
        message = "Error, logout has failed! Please try again.";
    }

    res.json({
        successful: true,
        message: message
    });

});





router.post("/getTimeSlots",function (req,res,next) {
    console.log(req.body);
    // let pageOwnerId = req.session.userid;
  
    const dconnection = mysql.createConnection({
        host: 'er7lx9km02rjyf3n.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'onzqd31kk47zcchv',
        password: 's3yj3kaf64b4bsn8',
        database: 'w5wqtsmzbiwz602n'
    });
    dconnection.connect();
    
    dconnection.query(`
SELECT *
FROM test_time_slots;`, 
        function(error, results, fields){
        console.log("here are the timeSlots: ", results);
        console.log(error);
        if (error) throw error;
            res.json({
                response: "Successfully retrieved timeSlots",
                retrievedTimeSlots: results
            });
    });
    dconnection.end();
});


router.post("/deleteTimeSlot",function (req,res,next) {
    console.log(req.body);
    let slotId = req.body.timeSlotId;
    console.log("js id", slotId);
    const dconnection = mysql.createConnection({
        host: 'er7lx9km02rjyf3n.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'onzqd31kk47zcchv',
        password: 's3yj3kaf64b4bsn8',
        database: 'w5wqtsmzbiwz602n'
    });
    dconnection.connect();
    dconnection.query(`
DELETE
FROM test_time_slots
WHERE timeSlotId = "${slotId}"
`, function(error, results, fields){
        console.log("here are the reviews: ", results);
        console.log(error);
        if (error) throw error;
            res.json({
                 response: "Successfully deleted review"
            });
    });
    
    dconnection.end();
});




router.post("/addTimeSlot",function (req,res,next) {
    console.log(req.body);
    let userId = req.session.userId;
    let date = req.body.date;
    let startTime = req.body.startTime;
    let endTime = req.body.endTime;
    
    console.log("js id", userId);
    const dconnection = mysql.createConnection({
        host: 'er7lx9km02rjyf3n.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'onzqd31kk47zcchv',
        password: 's3yj3kaf64b4bsn8',
        database: 'w5wqtsmzbiwz602n'
    });
    dconnection.connect();
    dconnection.query(`
INSERT INTO test_time_slots (userId, date, startTime, endTime)
VALUES ("${userId}", "${date}", "${startTime}", "${endTime}");
`, function(error, results, fields){
        console.log("here are the timeSlots: ", results);
        console.log(error);
        if (error) throw error;
            res.json({
                 response: "Successfully added time slot"
            });
    });
    
    dconnection.end();
});




module.exports = router;