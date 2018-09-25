
var config = require('../config/aunthenticate');
var jwt = require('jsonwebtoken');
var schema = require('../model/userModel');
var user = new schema();
var response = {};

var express = require('express');
var router = express.Router();
var app = express();
app.use(express.json());
const { check, validationResult } = require('express-validator/check');


router.post("/login", [
    check('email').isEmail(),
    check('password').isLength({ min: 5 })
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        console.log(errors.array());
        return res.status(422).json({ errors: errors.array() });
    }

    user.password = require('crypto')
        .createHash('sha1')
        .update(req.body.password)
        .digest('base64');

        console.log('Searching data');
        
    schema.find({ password: user.password })
        .then(result => {

            if (result.length > 0) {
                var token = jwt.sign({ id: user._id }, config.secret, {
                    expiresIn: 86400
                });

                response = {
                    "message": "Successfully logged in",
                    "token": token
                };
                console.log('User succesfully Logged in');
                res.status(200).send(response);
            }
            else {

                console.log("Invalid Credentials.");
                return res.status(404).send({
                    message: "Invalid Credentials."
                });
            }
        }).catch(err => {

            console.log("Some error occurred while retrieving users.");
            return res.status(500).send({
                message: err.message || "Some error occurred while retrieving users."
            });
        });
});

router.post('/register', [
    check('username').isAlpha().isLength({ min: 3 }),
    check('phonenumber').isNumeric().isLength({ min: 10, max: 10 }),
    check('email').isEmail(),
    check('password').isLength({ min: 5 })
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(422).json({ errors: errors.array() });
    }

    user.username = req.body.username;
    user.phonenumber = req.body.phonenumber;
    user.email = req.body.email;
    user.password = require('crypto')
        .createHash('sha1')
        .update(req.body.password)
        .digest('base64');

    schema.find({ email: user.email })
        .then(result => {

            if (result.length > 0) {

                response = {
                    "message": "Already registerd",
                };

                console.log("Already registerd");
                return res.status(400).send(response);
            }
            else {

                user.save(function (err) {
                    if (err) {
                        response = {
                            "error": true, "message": "error handling data", "err": err
                        };
                        console.log("error handling data");
                        return res.status(500).send(response);
                    }
                    else {
                        var token = jwt.sign({ id: user._id }, config.secret, {
                            expiresIn: 86400 // expires in 24 hours
                        });
                        response = {
                            "message": "Successfully registerd",
                            "token": token
                        };

                        console.log('Registered successfully');
                        return res.status(200).send(response);
                    }
                });
            }

        }).catch(err => {

            console.log("Some error occurred while retrieving users.");

            return res.status(500).send({
                message: err.message || "Some error occurred while retrieving users."
            });
        });

});


router.get("/view", (req, res) => {

    user.username = req.body.username;

    schema.find({}, function(err, users) {
        if (err) throw err;
      
       

        var temp = [];
        
        for (let index = 0; index < users.length; index++) {

            if( user.email != users[index].email) {
                temp.push(users[index].username)
            }
            
        }

        response = {
            "users": temp ,    
        };
        
        console.log(temp);
        console.log('users in data base');
        return res.status(200).send(response);
        
      });
       
});




app.use('/', router);
module.exports = router;