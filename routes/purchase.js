var Promise = require("bluebird");

exports.show = function (req, res, next) {
    req.getServices()
      .then(function(services){
        var isAdmin = req.session.role === "admin";
        var user = req.session.role !== "admin";
        var purchaseDataService = services.purchaseDataService;
        Promise.join(purchaseDataService.purchases(), purchaseDataService.suppliers(), purchaseDataService.products(),
                     function(purchases,suppliers,products){
            res.render('addPurchase', {
                products : products,
                purchases: purchases,
                Suppliers: suppliers,
                in_ca: isAdmin,
                action: user

            });
        })
          .catch(function(err){
            next(err);
          })
    });
};

    exports.add = function (req, res, next) {
    req.getServices()
      .then(function(services){
        var input = JSON.parse(JSON.stringify(req.body));
        var data = {
            Supplier_Id:input.Supplier_Id,
            Product_Id:input.Product_Id,
            Purchase_date: input.Purchase_date,
            Purchase_price: input.Purchase_price,
            Qty:input.Qty
        };
        var purchaseDataService = services.purchaseDataService;
        purchaseDataService.addPurchase(data)
          .then(function(results){
            res.redirect('/addPurchase');
      })
            .catch(function(err){
                next(err);
            });
        });
    };

    exports.get = function(req, res, next){
        req.getServices()
          .then(function(services){
            var purchaseId = Number(req.params.purchase_Id);
            var purchaseDataService = services.purchaseDataService;
            Promise.join(purchaseDataService.getPurchase(purchaseId),
                purchaseDataService.suppliers(),
                purchaseDataService.products(),
                function(purchases, supply, products){
                    var supplier = purchases.length > 0 ? purchases[0] : {};
                    var suppList = supply.map(function(storedSupplier){
                        var supplierResult = {
                            Id : storedSupplier.Id,
                            Name : storedSupplier.Name,
                            selectedSupplier : storedSupplier.Id === supplier.Supplier_Id
                        };
                        return supplierResult;
                    });

                        var purchase = purchases.length > 0 ? purchases[0] : {};
                        var productList = products.map(function(product){
                            var result = {
                                Id : product.Id,
                                Name : product.Name,
                                selectedProduct : product.Id === purchase.Product_Id
                            };
                            return result;
                        });

                        var context = {
                            products : productList,
                            purchase: purchase,
                            Suppliers: suppList
                        };
                        res.render('purchase_edit', context);
                });
            })
              .catch(function(err){
                  next(err);
              });
        };

    exports.update = function(req, res, next){
        req.getServices()
          .then(function(services){
            var data = JSON.parse(JSON.stringify(req.body));
            var Id = req.params.Id;
            var purchaseDataService = services.purchaseDataService;
            purchaseDataService.updatePurchase(data,Id)
              .then(function(results){
                res.redirect('/addPurchase');
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
        var purchaseDataService = services.purchaseDataService;
        purchaseDataService.deletePurchase(Id)
          .then(function(results){
            res.redirect('/addPurchase');
        })
            .catch(function(err){
                next(err);
            });
        });
    };
