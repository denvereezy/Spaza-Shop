var Promise = require("bluebird");

module.exports = function(connection){
  
    var showQuery = function (query, cb) {
        connection.query(query, cb);
    };

    var updateQuery = function (query, data, cb) {
        connection.query(query, data, cb);
    };
    
    this.purchases = function(){
        return new Promise(function(resolve,reject){
            showQuery('SELECT p.Id, DATE_FORMAT(Purchase_date,"%d %b %y") as Purchase_date,Qty, Purchase_price,s.Name,c.Name as names from Purchases p inner join Products s on p.Product_Id = s.Id inner join Suppliers c on p.Supplier_Id = c.Id order by Purchase_date desc', function(err, results, fields) {
                if (err) return reject (err)
                    resolve(results);
            });
        });
    };
    
    this.suppliers = function(){
        return new Promise(function(resolve,reject){
            showQuery('SELECT * from Suppliers', function(err, results, fields) {
                if (err) return reject (err)
                    resolve(results);
            });
        });
    };
    
    this.products = function(){
        return new Promise(function(resolve,reject){
            showQuery('SELECT * from Products', function(err,results,fields){
                if (err) return reject (err)
                    resolve(results);
            });
        });
    };
    
    this.addPurchase = function(data){
        return new Promise(function(resolve,reject){
            updateQuery('insert into Purchases set ?', data, function(err, results) {  
                if (err) return reject (err)
                    resolve(results);                 
            });  
        });
    };
    
    this.deletePurchase = function(Id){
        return new Promise(function(resolve,reject){
            updateQuery('DELETE FROM Purchases WHERE Id = ?', [Id], function(err,results){
                if (err) return reject (err)
                    resolve(results);
            });
        });
    };
    
    this.getPurchase = function(purchaseId){
        return new Promise(function(resolve,reject){
            updateQuery('SELECT * from Purchases p where p.Id = ?', [purchaseId], function(err, results, fields) {
                if (err) return reject (err)
                    resolve(results);
            });
        });
    };
    
    this.update = function(data,Id){
        return new Promise(function(resolve,reject){
            updateQuery('UPDATE Purchases SET ? WHERE Id = ?', [data,Id], function(err, results){
                if (err) return reject (err)
                    resolve(results);
            });
        });
    };
    
};