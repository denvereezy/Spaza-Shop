    exports.show = function (req, res, next) {
        req.getServices()
          .then(function(services){
            var isAdmin = req.session.role === "admin"
            var user = req.session.role !== "admin"
            var suppliersDataService = services.suppliersDataService;
            suppliersDataService.suppliersList()
                .then(function(results){
                    res.render('suppliers', {
                        suppliers: results,
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
                Name : input.Name
            };
            var suppliersDataService = services.suppliersDataService;
            suppliersDataService.addSupplier(data)
                .then(function(results){
                    res.redirect('/suppliers');
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
              var suppliersDataService = services.suppliersDataService;
              suppliersDataService.editSupplier(Id)
                  .then(function(results){
                      res.render('suppliers_edit',{data : results[0]});
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
                var suppliersDataService = services.suppliersDataService;
                suppliersDataService.updateSupplier(data,Id)
                    .then(function(results){
                      res.redirect('/suppliers');
                })
                    .catch(function(err){
                        next(err);
                });
        });
    };

    exports.delete = function(req, res, next){
        var Id = req.params.Id;
        req.getServices()
          .then(function(services){
            var suppliersDataService = services.suppliersDataService;
            suppliersDataService.deleteSupplier(Id)
                .then(function(results){
                res.redirect('/suppliers');
            })
                .catch(function(err){
                    next(err);
                });
        });
    };
