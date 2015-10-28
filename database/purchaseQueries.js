var Promise = require("bluebird");

module.exports = function(connection){
  
    var executeQuery = function(query, params){
        return new Promise(function(resolve, reject){
            params = params || {};
            connection.query(query, params, function(err, results){
                if(err) return reject(err);
                resolve(results);
            });
        });
    };
    
    this.purchases = function(){
        executeQuery('SELECT p.Id, DATE_FORMAT(Purchase_date,"%d %b %y") as Purchase_date,Qty, Purchase_price,s.Name,c.Name as names from Purchases p inner join Products s on p.Product_Id = s.Id inner join Suppliers c on p.Supplier_Id = c.Id order by Purchase_date desc');
    };
    
    this.suppliers = function(){
       return executeQuery('SELECT * from Suppliers');
    };
    
    this.products = function(){
       return executeQuery('SELECT * from Products');
    };
    
    this.addPurchase = function(data){
       return executeQuery('insert into Purchases set ?', data);
    };
    
    this.deletePurchase = function(Id){
       return executeQuery('DELETE FROM Purchases WHERE Id = ?', [Id]);
    };
    
    this.getPurchase = function(purchaseId){
       return executeQuery('SELECT * from Purchases p where p.Id = ?', [purchaseId]);
    };
    
    this.update = function(data,Id){
       return executeQuery('UPDATE Purchases SET ? WHERE Id = ?', [data,Id]);
    };
    
};