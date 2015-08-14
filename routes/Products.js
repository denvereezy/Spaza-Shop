
    exports.show = function (req, res, next) {
        req.getConnection(function(err, connection){
            if (err) 
                return next(err);
               connection.query('SELECT * from Products order by Id desc', [], function(err, results, fields) {
                if (err)
                    return next(err);

            var isAdmin = req.session.role === "admin"
                var user = req.session.role !== "admin" 

            console.log(req.session);
                console.log(isAdmin);		

                connection.query('SELECT * from Categories', [], function(err, cat, fields) {
                    if (err)
                        return next(err);
                    res.render('products_list', {
                          products: results,
                          categories: cat,
                          in_ca: isAdmin, 
                          action: user
                    });

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
                        Category_Id:input.Category_Id
                };
            connection.query('insert into Products set ?', data, function(err, results) {
                    if (err)
                            console.log("Error inserting : %s ",err );

                    res.redirect('/products_list');
                });
        });
    };

    exports.get = function(req, res, next){
        var Id = req.params.Id;
        req.getConnection(function(err, connection){
            connection.query('SELECT * FROM Products WHERE Id = ?', [Id], function(err,rows){
                if(err){
                        console.log("Error Selecting : %s ",err );
                }
                res.render('products_edit',{page_title:"Edit Customers - Node.js", data : rows[0]});      
            }); 
        });
    };

    exports.update = function(req, res, next){

        var data = JSON.parse(JSON.stringify(req.body));
            var Id = req.params.Id;
            req.getConnection(function(err, connection){
                connection.query('UPDATE Products SET ? WHERE Id = ?', [data, Id], function(err, rows){
                    if (err){
                            console.log("Error Updating : %s ",err );
                    }
                    res.redirect('/products_list');
                });

        });
    };

    exports.delete = function(req, res, next){
        var Id = req.params.Id;
        req.getConnection(function(err, connection){
            connection.query('DELETE FROM Products WHERE Id = ?', [Id], function(err,rows){
                if(err){
                        console.log("Error Selecting : %s ",err );
                }
                res.redirect('/products_list');
            });
        });
    };

