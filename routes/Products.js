var Promise = require("bluebird");

    exports.show = function (req, res, next) {
        req.getServices()
        .then(function(services){
            var isAdmin = req.session.role === "admin";
                var user = req.session.role !== "admin";
                var productDataService = services.productDataService;
                Promise.join(productDataService.productList() , productDataService.categoryList(),
                             function(products,categories){

                    res.render('products_list', {
                          products: products,
                          categories: categories,
                          in_ca: isAdmin,
                          action: user,
                          user:req.session.user,
                          role:req.session.role
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
                        Name : input.Name,
                        Category_Id:input.Category_Id
                };
             var productDataService = services.productDataService;
            productDataService.addProduct(data)
            .then(function(results){
                    res.redirect('/products_list');
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
            var productDataService = services.productDataService;
            productDataService.edit(Id)
            .then(function(results){
                res.render('products_edit',{data : results[0]});
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
          var Id = req.params.Id;
          var productDataService = services.productDataService;
          productDataService.update(data,Id)
            .then(function(results){
                  res.redirect('/products_list');
            })
              .catch(function(err){
                  next(err);
            });
        });
    };

    exports.delete = function(req, res, next){
      req.getServices()
        .then(function(services){
            var Id = req.params.Id;
            var productDataService = services.productDataService;
            productDataService.delete(Id)
              .then(function(results){
                res.redirect('/products_list');
            })
              .catch(function(err){
                    next(err);
            });
        });
    };
