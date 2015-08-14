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
            if (err) {
                return next(err);
            }

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
                    connection.query('insert into Users set ?', data, function(err, results) {
                        if (err)
                            console.log("Error inserting : %s ", err);

                        res.redirect('/?status=user_created');

                    });
                });
            });



        });

    };

    exports.adminSignup = function(req, res, next) {
        req.getConnection(function(err, connection) {
            if (err) {
                return next(err);
            }

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
                    connection.query('insert into Users set ?', data, function(err, results) {
                        if (err)
                            console.log("Error inserting : %s ", err);
                         if(input.key == admin){                      

                        res.redirect('/?status=user_created');
                        }
                       else{
                           res.redirect('/admin_signup');
                          }
                    });
                });
            });



        });

    };


    exports.userLogin = function(req, res, next) {
        var input = JSON.parse(JSON.stringify(req.body));
       var username = input.username;
        req.getConnection(function(err, connection) {
            if (err)
                return next(err)

            connection.query('SELECT * from Users WHERE Username=?', [username], function(err, users) {

            var user = users[0];

                bcrypt.compare(input.password, user.Password, function(err, pass) {

            console.log(user);

                    if (err) {
                        console.log(err);
                    }

                    if (pass) {
                        req.session.user = username;
                req.session.role =  user.User_role;
                        return res.redirect("/home")
                    } else {
                        return res.redirect('/');
                    }
                })
            })
        })
    };
