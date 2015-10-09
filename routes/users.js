var Content = require('../routes/usersQueries');

    exports.show = function (req, res, next) {
        req.getConnection(function(err, connection){
                     var isAdmin = req.session.role === "admin";
                     var readOnly = req.session.role !== "admin";
            var resultsCb = function(results){
                    res.render('users', {
                        users: results,
                        in_ca: isAdmin,
                        action:readOnly

                    });
                };
            var content = new Content(connection);
            content.usersList()
                .then(resultsCb)
                .catch(function(err){
                    next(err);
            });
        });
    };

    //updating a user
    exports.admin = function(req, res, next) {

        var data = JSON.parse(JSON.stringify(req.body));
        var id = req.params.Id;
        req.getConnection(function(err, connection) {
            var resultsCb = function(Results){       
                res.redirect('/users');
            };
            var content = new Content(connection);
            content.adminUser(id)
                .then(resultsCb)
                .catch(function(err){
                    next(err);
                });
        });
    };
    exports.notAdmin = function(req, res, next) {

        var data = JSON.parse(JSON.stringify(req.body));
        var id = req.params.Id;
        req.getConnection(function(err, connection) {
            var resultsCb = function(results){
                res.redirect('/users');
            };
            var content = new Content(connection);
            content.notAdmin(id)
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
                res.redirect('/users');
            };
            var content = new Content(connection);
            content.delete(Id)
                .then(resultsCb)
                .catch(function(err){
                    next(err);       
                });
        });
    };

