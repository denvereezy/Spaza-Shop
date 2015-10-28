    //most popular product
    exports.showPopularProduct = function (req, res, next) {
        req.getServices()
            .then(function(services){
                var spazaDataServise = services.spazaDataServise;
                spazaDataServise.popularProduct()
                    .then(function(results) {
                    
                    console.log(results);
                        res.render( 'leastpopular', {
                        products : results
                        });
                    })
                    .catch(function(err){
                        next(err);
                    });
            });
    };

    //least popular product
    exports.showLeastPopularProduct = function (req, res, next) {
        req.getServices()
            .then(function(services){
                var spazaDataServise = services.spazaDataServise;
                spazaDataServise.leastPopularPrd()
                    .then(function(results) {
                        res.render( 'leastpopular', {
                        products : results
                        });
                    })
                    .catch(function(err){
                        next(err);
                    });
            });
    };

    //earnings per product
    exports.showEarningsPerProduct = function (req, res, next) {
        req.getServices()
            .then(function(services){
                var spazaDataServise = services.spazaDataServise;
                spazaDataServise.prdEarnings()
                    .then(function(results) {
                        res.render( 'earningsPerProduct', {
                        products : results
                        });
                    })
                    .catch(function(err){
                        next(err);
                    });
            });
  };

    //most popular category
    exports.showPopularCategory = function (req, res, next) {
        req.getServices()
            .then(function(services){
                var spazaDataServise = services.spazaDataServise;
                spazaDataServise.popularCategory()
                    .then(function(results) {
                        res.render( 'popularCategory', {
                        products : results
                        });
                    })
                    .catch(function(err){
                        next(err);
                    });
            });
  };

    //least popular category
    exports.showLeastPopularCategory = function (req, res, next) {
        req.getServices()
            .then(function(services){
                var spazaDataServise = services.spazaDataServise;
                spazaDataServise.leastPopularCat()
                    .then(function(results) {
                        res.render( 'leastpopcat', {
                        products : results
                        });
                    })
                    .catch(function(err){
                        next(err);
                    });
            });
    };

    //earnings per category
    exports.showEarningsPerCategory = function (req, res, next) {
        req.getServices()
            .then(function(services){
                var spazaDataServise = services.spazaDataServise;
                spazaDataServise.categoryEarnings()
                    .then(function(results) {
                        res.render( 'earningsPerCategory', {
                        products : results
                        });
                    })
                    .catch(function(err){
                        next(err);
                    });
            });
    };

    //product graph
    exports.showProductGraph = function (req, res, next) {
        req.getServices()
            .then(function(services){
                var spazaDataServise = services.spazaDataServise;
                spazaDataServise.productGraph()
                    .then(function(results) {
                        res.render( 'productGraph', {
                        products : results
                        });
                    })
                    .catch(function(err){
                        next(err);
                    });
            });
    };

    //category graph
    exports.showCategoryGraph = function (req, res, next) {
        req.getServices()
            .then(function(services){
                var spazaDataServise = services.spazaDataServise;
                spazaDataServise.categoryGraph()
                    .then(function(results) {
                        res.render( 'graph', {
                        products : results
                        });
                    })
                    .catch(function(err){
                        next(err);
                    });
            });
    };
