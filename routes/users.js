
    exports.show = function (req, res, next) {
        req.getConnection(function(err, connection){
            if (err) 
                return next(err);
                     var isAdmin = req.session.role === "admin";
                     var readOnly = req.session.role !== "admin";
               connection.query('SELECT * from Users', [], function(err, results, fields) {
                    res.render('users', {
                        users: results,
                        in_ca: isAdmin,
                        action:readOnly

                    });

                });
        });

    };

    exports.get = function(req, res, next){
        var Id = req.params.User_role;
        req.getConnection(function(err, connection){
            connection.query('SELECT * FROM Users WHERE User_role = ?', [Id], function(err,rows){
                if(err){
                        console.log("Error Selecting : %s ",err );
                }
                res.render('users_edit',{page_title:"Edit Customers - Node.js", data : rows[3]});   

            }); 
        });
    };

    //updating a user
    exports.admin = function(req, res, next) {

        var data = JSON.parse(JSON.stringify(req.body));
        var id = req.params.Id;
        req.getConnection(function(err, connection) {
            connection.query('UPDATE Users SET User_role = "admin" WHERE ID = ?', id, function(err, rows) {
                if (err) {
                    console.log("Error Updating : %s ", err);
                }
                res.redirect('/users');
            });

        });
    };
    exports.notAdmin = function(req, res, next) {

        var data = JSON.parse(JSON.stringify(req.body));
        var id = req.params.Id;
        req.getConnection(function(err, connection) {
            connection.query('UPDATE Users SET User_role = "read-only" WHERE ID = ?', id, function(err, rows) {
                if (err) {
                    console.log("Error Updating : %s ", err);
                }
                res.redirect('/users');
            });

        });
    };

  exports.update = function(req, res, next){

        var data = JSON.parse(JSON.stringify(req.body));
            var Id = req.params.Id;
            req.getConnection(function(err, connection){
                connection.query('UPDATE Users SET ? WHERE Id = ?', [data, Id], function(err, rows){
                    if (err){
                            console.log("Error Updating : %s ",err );
                    }
                    res.redirect('/users');
                });

        });
    };

    exports.delete = function(req, res, next){
        var Id = req.params.Id;
        req.getConnection(function(err, connection){
            connection.query('DELETE FROM Users WHERE Id = ?', [Id], function(err,rows){
                if(err){
                        console.log("Error Selecting : %s ",err );
                }
                res.redirect('/users');
            });
        });
    };

