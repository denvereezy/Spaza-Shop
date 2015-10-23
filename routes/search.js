exports.search_products = function( req, res, next ) {
    req.getServices()
      .then(function(services){
        var searchValue = "%" + req.params.searchValue + "%";
        var searchDataService = services.searchDataService;
        searchDataService.findProductByName(searchValue)
          .then(function(results){
              res.render('products_search', {
                  username : req.session.user,
                  products : results,
                  layout : false
              });
        })
            .catch(function(err){
                next(err);
            });

    })
};

exports.search_grouped_sales = function(req, res, next){
    req.getServices()
      .then(function(services){
        var searchValue = "%" + req.params.searchValue + "%";
        var searchDataService = services.searchDataService;
        searchDataService.findGroupedSales(searchValue)
          .then(function(results){
              res.render('gsales_search', {
                  username : req.session.user,
                  products : results,
                  layout : false
              });
        })
              .catch(function(err){
                       next(err);
                });
    });
};

exports.search_all_sales = function(req, res, next){
    req.getServices()
      .then(function(services){
        var searchValue = "%" + req.params.searchValue + "%";
        var searchDataService = services.searchDataService;
        searchDataService.allSales(searchValue)
            .then(function(results){
                res.render('allsales_search', {
                    username : req.session.user,
                    products : results,
                    layout : false
                });
        })
              .catch(function(err){
                next(err);
            });
    });
};

exports.search_product_earnings = function(req, res, next){
    req.getServices()
      .then(function(services){
        var searchValue = "%" + req.params.searchValue + "%";
        var searchDataService = services.searchDataService;
        searchDataService.product_earnings(searchValue)
            .then(function(results){
                res.render('earnings_search', {
                    username : req.session.user,
                    products : results,
                    layout : false
                });
        })
            .catch(function(err){
                next(err);
            });
    });
};

exports.search_categories = function(req, res, next){
    req.getServices()
      .then(function(services){
        var searchValue = "%" + req.params.searchValue + "%";
        var searchDataService = services.searchDataService;
        searchDataService.categories(searchValue)
            .then(function( results){
                res.render('category_search', {
                    username : req.session.user,
                    products : results,
                    layout : false
                });
        })
            .catch(function(err){
                next(err);
        });
    })
};

exports.search_category_sales = function(req, res, next){
    req.getServices()
        .then(function(services){
        var searchValue = "%" + req.params.searchValue + "%";
        var searchDataService = services.searchDataService;
        searchDataService.category_sales(searchValue)
            .then(function(results){
                res.render('category_sales_search', {
                    username : req.session.user,
                    products : results,
                    layout : false
                });
        })
            .catch(function(err){
            next(err);
        });

    });
};

exports.search_category_earnings = function(req, res, next){
    req.getServices()
      .then(function(services){
        var searchValue = "%" + req.params.searchValue + "%";
        var searchDataService = services.searchDataService;
        searchDataService.category_earnings(searchValue)
            .then(function(results){
                res.render('category_earnings_search', {
                    username : req.session.user,
                    products : results,
                    layout : false
                });
        })
            .catch(function(err){
            next(err);
        });
    });
};

exports.search_suppliers = function(req, res, next){
    req.getServices()
      .then(function(services){
        var searchValue = "%" + req.params.searchValue + "%";
        var searchDataService = services.searchDataService;
        searchDataService.suppliers(searchValue)
            .then(function(results){
                res.render('suppliers_search', {
                    username : req.session.user,
                    products : results,
                    layout : false
                });
        })
            .catch(function(err){
                    next(err);
            });
    });
};

exports.search_purchases = function(req, res, next){
    req.getServices()
      .then(function(services){
        var searchValue = "%" + req.params.searchValue + "%";
        var searchDataService = services.searchDataService;
        searchDataService.purchases(searchValue)
            .then(function(results){
                res.render('purchases_search', {
                    username : req.session.user,
                    products : results,
                    layout : false
                });
        })
            .catch(function(err){
            next(err);
        });
    });
};
