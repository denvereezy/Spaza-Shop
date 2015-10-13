var Sales = require("../routes/salesQueries");
var Promise = require("bluebird");

    exports.showAllSales = function (req, res, next) {
        req.getConnection(function(err, connection){
            var resultsCb = function(results){
                res.render('salesPerProduct', {
                    products: results,
                });
            };
            var sales = new Sales(connection);
            sales.showAllSales()
                .then(resultsCb)
                .catch(function(err){
                    next(err);
            });
        });
    };

    exports.show = function (req, res, next) {
        req.getConnection(function(err, connection){

                    var isAdmin = req.session.role === "admin"
                    var user = req.session.role !== "admin"
                    var salesList = new Sales(connection);
                Promise.join(salesList.sales(), salesList.products(),
                             function(sales, products){
                    res.render('list', {
                        products: sales,
                        product: products,
                        in_ca: isAdmin,
                        action: user
                });
            });
        });
    };

    exports.add = function (req, res, next) {
        req.getConnection(function(err, connection){
  
            var input = JSON.parse(JSON.stringify(req.body));
            var data = {
                        Product_Id:input.Id,
                        Qty :input.Qty,
                        Sales_date:input.Sales_date,
                        Sales_price:input.Sales_price
                };
                 var resultsCb = function(results){
                    res.redirect('/list');
                };
                var sales = new Sales(connection);
                sales.add(data)
                    .then(resultsCb)
                    .catch(function(err){
                        next(err);
            });
        });
    };

    exports.get = function(req, res, next){
        var Id = req.params.Id;
        req.getConnection(function(err, connection){
            var resultsCb = function(results){
                res.render('edit',{data : results[0]});      
            }; 
            var sales = new Sales(connection);
            sales.edit(Id)
                .then(resultsCb)
                .catch(function(err){
                    next(err);
            });
        });
    };

    exports.update = function(req, res, next){
        var data = JSON.parse(JSON.stringify(req.body));
            var id = req.params.Id;
            req.getConnection(function(err, connection){
                var resultsCb = function(results){
                    res.redirect('/list');
                };
                var sales = new Sales(connection)
                sales.update(data, id)
                    .then(resultsCb)
                    .catch(function(err){
                        next(err);
            });
        });
    };

