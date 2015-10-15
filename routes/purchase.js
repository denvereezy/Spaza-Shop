var Promise = require("bluebird");
var Purchases = require("../routes/purchaseQueries");

exports.show = function (req, res, next) {
    req.getConnection(function(err, connection){
        var isAdmin = req.session.role === "admin";
        var user = req.session.role !== "admin";
        var purchases = new Purchases(connection);
        
        Promise.join(purchases.purchases(), purchases.suppliers(), purchases.products(),
                     function(purchases,suppliers,products){
            res.render('addPurchase', {
                products : products,
                purchases: purchases,
                Suppliers: suppliers,
                in_ca: isAdmin, 
                action: user

            });
        });
    });
};

    exports.add = function (req, res, next) {
    req.getConnection(function(err, connection){
        var input = JSON.parse(JSON.stringify(req.body));
        var data = {
            Supplier_Id:input.Supplier_Id,
            Product_Id:input.Product_Id,
            Purchase_date: input.Purchase_date,
            Purchase_price: input.Purchase_price,
            Qty:input.Qty
        };
        var resultsCb = function(results){
            res.redirect('/addPurchase');
        };
        var purchases = new Purchases(connection);
        purchases.addPurchase(data)
            .then(resultsCb)
            .catch(function(err){
                next(err);
            });
        });
    };

    exports.get = function(req, res, next){
        req.getConnection(function(err, connection){
            var purchaseId = Number(req.params.purchase_Id);
            var purchase = new Purchases(connection);
            Promise.join(purchase.getPurchase(purchaseId),
                purchase.suppliers(),
                purchase.products(),
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
            });
        };

    exports.update = function(req, res, next){
        var data = JSON.parse(JSON.stringify(req.body));
        var Id = req.params.Id;
        req.getConnection(function(err, connection){
            var resultsCb = function(results){
                res.redirect('/addPurchase');
            };
            var updatePurchase = new Purchases(connection);
            updatePurchase.update(data,Id)
                .then(resultsCb)
                .catch(function(err){
                        next(err);
                });
        });
    };

    exports.delete = function(req, res, next){
    req.getConnection(function(err, connection){
        var Id = req.params.Id;
        var resultsCb = function(results){
            res.redirect('/addPurchase');
        };
        var purchases = new Purchases(connection);
        purchases.deletePurchase(Id)
            .then(resultsCb)
            .catch(function(err){
                next(err);
            });
        });
    };
