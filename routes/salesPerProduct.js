    exports.show = function (req, res, next) {
        req.getConnection(function(err, connection){
            if (err) 
                return next(err);
               connection.query('SELECT Qty AS AmtSold , Sales_date, Sales_price, Name from Sales s INNER JOIN Products p ON s.Product_Id = p.Id ORDER BY Sales_date DESC  ', [], function(err, results, fields) {
                                if (err)
                        return next(err);
                    res.render('salesPerProduct', {
                        products: results,
                    });

                });
        });

    };


