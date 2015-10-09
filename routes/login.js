var Content = require("../routes/loginQueries");
var bcrypt = require('bcrypt');

    exports.userCheck = function (req, res, next) {

        console.log(req.path);
        if (req.session.user){
             next(); 
        }
        else{
             res.redirect("/")
        }

    }

    exports.signup = function(req, res, next) {
        req.getConnection(function(err, connection) {

            var input = JSON.parse(JSON.stringify(req.body));
            var data = {
                Username: input.username,
                Password: input.password,
                User_role: 'read-only'

            };
              
            //bcrypt the password===
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(input.password, salt, function(err, hash) {
                    // Store hash in your password DB. 
                    data.Password = hash;
                    var resultsCb = function(results){
                    res.redirect('/?status=user_created');   
                    };
                    var content = new Content(connection);
                    content.signup(data)
                        .then(resultsCb)
                        .catch(function(err){
                            next(err);
                    });
                });
            });
        });
    };

    exports.adminSignup = function(req, res, next) {
        req.getConnection(function(err, connection) {

            var input = JSON.parse(JSON.stringify(req.body));
            var data = {
                Username: input.username,
                Password: input.password,
                User_role: input.key,

            };

            admin = 'admin';

            //bcrypt the password===
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(input.password, salt, function(err, hash) {
                    // Store hash in your password DB. 
                    data.Password = hash;
                   var resultsCb = function(results){
            
                         if(input.key == admin){                      

                        res.redirect('/?status=user_created');
                        }
                       else{
                           res.redirect('/admin_signup');
                          }
                    };
                    var content = new Content(connection);
                    content.adminSignup(data)
                        .then(resultsCb)
                        .catch(function(err){
                            next(err);
                    });
                });
            });
        });
    };


    exports.userLogin = function(req, res, next) {
        var input = JSON.parse(JSON.stringify(req.body));
       var username = input.username;
        req.getConnection(function(err, connection) {
        var resultsCb = function(results){    
            
            var user = results[0];

                bcrypt.compare(input.password, user.Password, function(err, pass) {
                    if (pass) {
                        req.session.user = username;
                        req.session.role =  user.User_role;
                        return res.redirect("/home")
                    } else {
                        return res.redirect('/');
                       
                    }
                });
            };
            var content = new Content(connection);
            content.login(username)
                .then(resultsCb)
                .catch(function(err){
                    next(err);
            });
        })
    };
