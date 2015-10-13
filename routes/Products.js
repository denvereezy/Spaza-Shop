var Promise = require("bluebird");
var Content = require("../routes/productQueries");

    exports.show = function (req, res, next) {
        req.getConnection(function(err, connection){
            var productQueries = new Content(connection);
            var isAdmin = req.session.role === "admin";
                var user = req.session.role !== "admin";
                Promise.join(productQueries.productList() , productQueries.categoryList(),
                             function(products,categories){
                    
                    res.render('products_list', {
                          products: products,
                          categories: categories,
                          in_ca: isAdmin,
                          action: user,
                          user:req.session.user,
                          role:req.session.role
                });
            });                                
        });
    };

    exports.add = function (req, res, next) {
        req.getConnection(function(err, connection){
         
            var input = JSON.parse(JSON.stringify(req.body));
            var data = {
                        Name : input.Name,
                        Category_Id:input.Category_Id
                };
            var resultsCb = function(results){
                    res.redirect('/products_list');
                };
            var content = new Content(connection);
            content.addProduct(data)
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
                res.render('products_edit',{data : results[0]});      
            }; 
            var content = new Content(connection);
            content.edit(Id)
                .then(resultsCb)
                .catch(function(err){
                    next(err);
            });
        });
    };

    exports.update = function(req, res, next){
        var data = JSON.parse(JSON.stringify(req.body));
        var Id = req.params.Id;
            req.getConnection(function(err, connection){
                var resultsCb = function(results){
                    res.redirect('/products_list');
                };
            var content = new Content(connection);
                content.update(data,Id)
                    .then(resultsCb)
                    .catch(function(err){
                        next(err);
            });
        });
    };

    exports.delete = function(req, res, next){
        var Id = req.params.Id;
        req.getConnection(function(err, connection){
            var resultsCb = function(results){
                res.redirect('/products_list');
            };
            var content = new Content(connection);
            content.delete(Id)
                .then(resultsCb)
                .catch(function(err){
                    next(err);
            });
        });
    };

