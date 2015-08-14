
    exports.show = function (req, res, next) {
        req.getConnection(function(err, connection){
            if (err) 
                return next(err);

                     var isAdmin = req.session.role === "admin"
                     var user = req.session.role !== "admin"

            connection.query('SELECT * from Categories', [], function(err, results) {
                if (err) return next(err);

                res.render( 'category_list', {
                    products : results,
                            in_ca: isAdmin, 
                            action: user
                });
          });
        });
    };

    exports.add = function (req, res, next) {
        req.getConnection(function(err, connection){
            if (err){ 
                return next(err);
            }

            var input = JSON.parse(JSON.stringify(req.body));
            var data = {
                        Name : input.Name,
                };
            connection.query('insert into Categories set ?', data, function(err, results) {
                    if (err)
                            console.log("Error inserting : %s ",err );

                    res.redirect('/category_list');
                });
        });
    };

    exports.get = function(req, res, next){
        var Id = req.params.Id;
        req.getConnection(function(err, connection){
            connection.query('SELECT * FROM Categories WHERE Id = ?', [Id], function(err,rows){
                if(err){
                        console.log("Error Selecting : %s ",err );
                }
                res.render('edit',{page_title:"Edit Customers - Node.js", data : rows[0]});      
            }); 
        });
    };

    exports.update = function(req, res, next){

        var data = JSON.parse(JSON.stringify(req.body));
            var Id = req.params.Id;
            req.getConnection(function(err, connection){
                connection.query('UPDATE Categories SET ? WHERE Id = ?', [data, Id], function(err, rows){
                    if (err){
                            console.log("Error Updating : %s ",err );
                    }
                    res.redirect('/category_list');
                });

        });
    };

    exports.delete = function(req, res, next){
        var Id = req.params.Id;
        req.getConnection(function(err, connection){
            connection.query('DELETE FROM Categories WHERE Id = ?', [Id], function(err,rows){
                if(err){
                        console.log("Error Selecting : %s ",err );
                }
                res.redirect('/category_list');
            });
        });
    };

