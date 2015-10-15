var Content = require("../routes/suppliersQueries");
        exports.show = function (req, res, next) {
            req.getConnection(function(err, connection){
                var resultsCb = function(results){
                var isAdmin = req.session.role === "admin"
                var user = req.session.role !== "admin"

                    res.render('suppliers', {
                        suppliers: results,
                        in_ca: isAdmin, 
                        action: user

                    });
                   };
                var content = new Content(connection);
                    content.suppliersList()
                        .then(resultsCb)
                        .catch(function(err){
                            next(err);
            });
        });
     };


        exports.add = function (req, res, next) {
            req.getConnection(function(err, connection){
                var resultsCb = function(results){
                        res.redirect('/suppliers');
                };
                var input = JSON.parse(JSON.stringify(req.body));
                var data = {
                    Name : input.Name
                };
                
                var content = new Content(connection);
                content.addSupplier(data)
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
                    res.render('suppliers_edit',{data : results[0]});      
                }; 
                var content = new Content(connection);
                content.editSupplier(Id)
                  .then(resultsCb)
                  .catch(function(err){
                        next(err);
                  });
            });
        };

        exports.update = function(req, res, next){
                req.getConnection(function(err, connection){
                  var resultsCb = function(results){  
                      res.redirect('/suppliers');
                    };   
                    var data = JSON.parse(JSON.stringify(req.body));
                    var Id = req.params.Id;

                    var content = new Content(connection);
                    content.updateSupplier(data,Id)
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
                    res.redirect('/suppliers');
                };
                var content = new Content(connection);
                content.deleteSupplier(Id)
                    .then(resultsCb)
                    .catch(function(err){
                        next(err);
                    });
            });
        };

