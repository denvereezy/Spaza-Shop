var Promise = require("bluebird");

    exports.showAllSales = function (req, res, next) {
        req.getServices()
          .then(function(services){
            var salesDataService = services.salesDataService;
            salesDataService.showAllSales()
               .then(function(results){
                res.render('salesPerProduct', {
                    products: results,
                });
            })
                .catch(function(err){
                    next(err);
            });
        });
    };

    exports.show = function (req, res, next) {
        req.getServices()
          .then(function(services){
                    var isAdmin = req.session.role === "admin"
                    var user = req.session.role !== "admin"
                    var salesDataService = services.salesDataService;
                    Promise.join(salesDataService.sales(), salesDataService.products(),
                             function(sales, products){
                    res.render('list', {
                        products: sales,
                        product: products,
                        in_ca: isAdmin,
                        action: user
                });
            })
            .catch(function(err){
              next(err);
            });
        });
    };

    exports.add = function (req, res, next) {
        req.getServices()
          .then(function(services){
            var input = JSON.parse(JSON.stringify(req.body));
            var data = {
                        Product_Id:input.Id,
                        Qty :input.Qty,
                        Sales_date:input.Sales_date,
                        Sales_price:input.Sales_price
                };
            var salesDataService = services.salesDataService;
            salesDataService.add(data)
                 .then(function(results){
                    res.redirect('/list');
                })
                    .catch(function(err){
                        next(err);
            });
        });
    };

    exports.get = function(req, res, next){
        req.getServices()
          .then(function(services){
          var Id = req.params.Id;
          var salesDataService = services.salesDataService;
          salesDataService.edit(Id)
            .then(function(results){
                res.render('edit',{data : results[0]});
            })
                .catch(function(err){
                    next(err);
            });
        });
    };

    exports.update = function(req, res, next){
        req.getServices()
          .then(function(services){
            var data = JSON.parse(JSON.stringify(req.body));
            var id = req.params.Id;
            var salesDataService = services.salesDataService;
            salesDataService.update(data, id)
                .then(function(results){
                    res.redirect('/list');
                })
                    .catch(function(err){
                        next(err);
            });
        });
    };
