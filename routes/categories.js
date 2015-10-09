var Content = require("../routes/categoryQueries");

    exports.show = function (req, res, next) {
        req.getConnection(function(err, connection){

            var isAdmin = req.session.role === "admin";
            var user = req.session.role !== "admin";
            var resultsCb = function(results){
                
                res.render( 'category_list', {
                    products : results,
                    in_ca: isAdmin, 
                    action: user
                });
            };
            var content = new Content(connection);
            content.categories()
                .then(resultsCb)
                .catch(function(err){
                    next(err);
        });
    });
};

    exports.showCategoryList = function (req, res, next) {
        req.getConnection(function(err, connection){
            var resultsCb = function(results){

            res.render( 'category_sales', {
                products : results
            });
        };
            var content = new Content(connection);
            content.catSales()
                .then(resultsCb)
                .catch(function(err){
                    next(err);
        });
     });
};


    exports.add = function (req, res, next) {
        req.getConnection(function(err, connection){
            var resultsCb = function(results){
                
                res.redirect('/category_list');
            };
            var input = JSON.parse(JSON.stringify(req.body));
            var data = {
                Name : input.Name,
            };
            
            var content = new Content(connection);
            content.addCategory(data)
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
            var content = new Content(connection);
            content.editCategory(Id)
                .then(resultsCb)
                .catch(function(err){
                    next(err);
            });
        });
    };

    exports.update = function(req, res, next){
            req.getConnection(function(err, connection){
                var resultsCb = function(results){
                    res.redirect('/category_list');
                };
                var data = JSON.parse(JSON.stringify(req.body));
                var Id = req.params.Id;
                
                var content = new Content(connection);
                content.updateCategory(data, Id)
                    .then(resultsCb)
                    .catch(function(err){
                        next(err);
            });
        });
    };

    exports.delete = function(req, res, next){
        req.getConnection(function(err, connection){
            var resultsCb = function(results){    
                res.redirect('/category_list');
            };
            var Id = req.params.Id;
            var content = new Content(connection);
            content.deleteCategory(Id)
                .then(resultsCb)
                .catch(function(err){
                    next(err);
            });
        });
    };

