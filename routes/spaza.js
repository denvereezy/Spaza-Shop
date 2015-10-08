var Queries = require('../routes/spazaQueries');
    //most popular product
    exports.showPopularProduct = function (req, res, next) {
        req.getConnection(function(err, connection){
            var resultsCb = function(results){
                res.render( 'popular', {
                    products : results
                });
            };
            var content = new Queries(connection);
            content.popularProduct()
                .then(resultsCb)
                .catch(function(err){
                    next(err);
            });    
        });
    };

    //least popular product
    exports.showLeastPopularProduct = function (req, res, next) {
        req.getConnection(function(err, connection){
            var resultsCb = function(results){
                res.render( 'leastpopular', {
                    products : results
                });
            };
            var content = new Queries(connection);
            content.leastPopularPrd()
                .then(resultsCb)
                .catch(function(err){
                    next(err);
            });
        });
    };

    //earnings per product
    exports.showEarningsPerProduct = function (req, res, next) {
        req.getConnection(function(err, connection){
            var resultsCb = function(results){
                res.render( 'earningsPerProduct', {
                    products : results
                });
            };
            var content = new Queries(connection);
                content.prdEarnings()
                .then(resultsCb)
                .catch(function(err){
                    next(err);
            });
        });
    };

    //most popular category
    exports.showPopularCategory = function (req, res, next) {
        req.getConnection(function(err, connection){
            var resultsCb = function(results){
                res.render( 'popularCategory', {
                    products : results
                });
            };
            var content = new Queries(connection);
            content.popularCategory()
                .then(resultsCb)
                .catch(function(err){
                next(err);
            });
        });
    };

    //least popular category
    exports.showLeastPopularCategory = function (req, res, next) {
        req.getConnection(function(err, connection){
            var resultsCb = function(results){

                res.render( 'leastpopcat', {
                    products : results
                });
            };
          var content = new Queries(connection);
            content.leastPopularCat()
                .then(resultsCb)
                .catch(function(err){
                    next(err);
            });
        });
    };

    //earnings per category
    exports.showEarningsPerCategory = function (req, res, next) {
        req.getConnection(function(err, connection){
            var resultsCb = function(results){
                res.render( 'earningsPerCategory', {
                    products : results
                });
          };
            var content = new Queries(connection);
            content.categoryEarnings()
                .then(resultsCb)
                .catch(function(err){
                    next(err);
            });
        });
    };

    //product graph
    exports.showProductGraph = function (req, res, next) {
        req.getConnection(function(err, connection){
         var resultsCb = function(results){
                res.render( 'productGraph', {
                    products : results
                });
          };
            var content = new Queries(connection);
            content.productGraph()
                .then(resultsCb)
                .catch(function(err){
                    next(err);
            });
        });
    };

    //category graph
    exports.showCategoryGraph = function (req, res, next) {
        req.getConnection(function(err, connection){
         var resultsCb = function(results){
                res.render( 'graph', {
                    products : results
                });
          };
            var content = new Queries(connection);
            content.categoryGraph()
                .then(resultsCb)
                .catch(function(err){
                    next(err);
            });
        });
    };
