
    /*exports.show = function (req, res, next) {
        req.getConnection(function(err, connection){
            if (err) 
                return next(err);
            connection.query('SELECT SUM(Qty) AS TotalQty , Product_Id, Name from Sales s INNER JOIN Products p ON s.Product_Id = p.Id 					GROUP BY Name', 
            [], function(err, results) {
                if (err) return next(err);

                res.render( 'list', {
                    product : results
                });
          });
        });
    };*/
    exports.show = function (req, res, next) {
        req.getConnection(function(err, connection){
            if (err) 
                return next(err);
               connection.query('SELECT SUM(Qty) AS TotalQty , Product_Id, Name from Sales s INNER JOIN Products p ON s.Product_Id = p.Id 					GROUP BY Name', [], function(err, results, fields) {
                if (err)
                    return next(err);

                    var isAdmin = req.session.role === "admin"

                connection.query('SELECT * from Products', [], function(err, pdt, fields) {
                    if (err)
                        return next(err);
                    res.render('list', {
                        products: results,
                        product: pdt,
                        in_ca: isAdmin
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
                        Product_Id:input.Id,
                        Qty :input.Qty,
                        Sales_date:input.Sales_date,
                        Sales_price:input.Sales_price

                             //sold :input.Qty
                };
            connection.query('insert into Sales set ?', data, function(err, results) {
                    if (err)
                            console.log("Error inserting : %s ",err );

                    res.redirect('/list');
                });
        });
    };

    exports.get = function(req, res, next){
        var Id = req.params.Id;
        req.getConnection(function(err, connection){
            connection.query('SELECT * FROM Sales WHERE id = ?', [Id], function(err,rows){
                if(err){
                        console.log("Error Selecting : %s ",err );
                }
                res.render('edit',{page_title:"Edit Customers - Node.js", data : rows[0]});      
            }); 
        });
    };

    exports.update = function(req, res, next){

        var data = JSON.parse(JSON.stringify(req.body));
            var id = req.params.Id;
            req.getConnection(function(err, connection){
                connection.query('UPDATE Sales SET ? WHERE Id = ?', [data, id], function(err, rows){
                    if (err){
                            console.log("Error Updating : %s ",err );
                    }
                    res.redirect('/list');
                });

        });
    };

