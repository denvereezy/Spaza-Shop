    exports.show = function (req, res, next) {
        req.getServices()
          .then(function(services){
              var isAdmin = req.session.role === "admin";
              var user = req.session.role !== "admin";
              var categoryDataService = services.categoryDataService;
              categoryDataService.categories()
                .then(function(results){
                    res.render( 'category_list', {
                        products : results,
                        in_ca: isAdmin,
                        action: user
                    });
            })
              .catch(function(err){
                  next(err);
        });
    });
};

    exports.showCategoryList = function (req, res, next) {
        req.getServices()
          .then(function(services){
            var categoryDataService = services.categoryDataService;
            categoryDataService.catSales()
              .then(function(results){
                  res.render( 'category_sales', {
                      products : results
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
            };
            var categoryDataService = services.categoryDataService;
            categoryDataService.addCategory(data)
              .then(function(results){
                  res.redirect('/category_list');
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
        var categoryDataService = services.categoryDataService;
        categoryDataService.editCategory(Id)
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
          var Id = req.params.Id;
          var categoryDataService = services.categoryDataService;
          categoryDataService.updateCategory(data,Id)
            .then(function(results){
                var resultsCb = function(results){
                    res.redirect('/category_list');
                };
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
            var categoryDataService = services.categoryDataService;
            categoryDataService.deleteCategory(Id)
              .then(function(results){
                  res.redirect('/category_list');
            })
              .catch(function(err){
                    next(err);
            });
        });
    };
