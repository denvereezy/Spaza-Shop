    exports.show = function (req, res, next) {
        req.getServices()
          .then(function(services){
              var isAdmin = req.session.role === "admin";
              var readOnly = req.session.role !== "admin";
              var usersDataService = services.usersDataService;
              usersDataService.usersList()
                  .then(function(results){
                      res.render('users', {
                          users: results,
                          in_ca: isAdmin,
                          action:readOnly
                      });
                })
                .catch(function(err){
                    next(err);
            });
        });
    };
    //updating a user
    exports.admin = function(req, res, next) {
        req.getServices()
          .then(function(services){
        var data = JSON.parse(JSON.stringify(req.body));
        var id = req.params.Id;
        var usersDataService = services.usersDataService;
        usersDataService.adminUser(id)
            .then(function(Results){
                res.redirect('/users');
            })
                .catch(function(err){
                    next(err);
                });
        });
    };
    exports.notAdmin = function(req, res, next) {
        req.getServices()
          .then(function(services){
        var data = JSON.parse(JSON.stringify(req.body));
        var id = req.params.Id;
        var usersDataService = services.usersDataService;
        usersDataService.notAdmin(id)
            .then(function(results){
                res.redirect('/users');
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
              var usersDataService = services.usersDataService;
              usersDataService.delete(Id)
                  .then(function(results){
                    res.redirect('/users');
            })
                .catch(function(err){
                    next(err);
                });
        });
    };
