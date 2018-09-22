exports.login=function(req,res){
    var usermod=require('../model/userModel');
    var mail=req.body.email;
    var password=require('crypto')
                .createHash('sha1')
                .update(req.body.password)
                .digest('base64');

                usermod.find({password : password})
                .then(result => {
                    if(result.length>0){

                        res.status(200).send({
                            message:"Successfully logged in."
                        });    
                    }

                    else {
                        res.status(500).send({
                            message:"Invalid Credentials."
                        });
                    }
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while retrieving users."
                    });
                });             
}

exports.registration=function(req,res){
   /* var expressValidator = require('express-validator');
    const { check } = require('express-validator/check'); 
    req.check('username', 'name is required').notEmpty().isLength({ min: 3 });
    req.check('email').isEmail(),
    req.check('phonenumber').isNumeric().isLength({ min:10 , max:10});

  // check for errors!
  var errors = req.validationErrors();
  if (errors) {
    res.send('There have been validation errors: ' + util.inspect(errors), 400);
    return;
  }*/
    var usermod=require('../model/userModel');
    var db=new usermod();
    var response={};
    db.username=req.body.username;
    db.phonenumber=req.body.phonenumber;
    db.email=req.body.email;
    db.password=require('crypto')
                .createHash('sha1')
                .update(req.body.password)
                .digest('base64');
              //  db.createIndex(userCollection, {username:1}, {unique:true});



    
                db.save(function(err){
                    if(err){
                        response={
        
                            "error":true,"message":"error handling data","err":err
                        };
                    }
                    else{
                        response={

                            "error":false,"message":"Successfully registerd"
                        };
                    }
                    res.json(response);
            }
        );    
}