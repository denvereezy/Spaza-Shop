var QueryService = require("../database/query-service");

module.exports = function(connection){
  var queryService = new QueryService(connection);
    
    this.purchases = function(){
        return queryService.executeQuery('SELECT p.Id, DATE_FORMAT(Purchase_date,"%d %b %y") as Purchase_date,Qty, Purchase_price,s.Name,c.Name as names from Purchases p inner join Products s on p.Product_Id = s.Id inner join Suppliers c on p.Supplier_Id = c.Id order by Purchase_date desc');
    };
    
    this.suppliers = function(){
        return queryService.executeQuery('SELECT * from Suppliers');
    };
    
    this.products = function(){
        return queryService.executeQuery('SELECT * from Products');
    };
    
    this.addPurchase = function(data){
        return queryService.executeQuery('insert into Purchases set ?', data);
    };
    
    this.deletePurchase = function(Id){
        return queryService.executeQuery('DELETE FROM Purchases WHERE Id = ?', [Id]);
    };
    
    this.getPurchase = function(purchaseId){
        return queryService.executeQuery('SELECT * from Purchases p where p.Id = ?', [purchaseId]);
    };
    
    this.update = function(data,Id){
        return queryService.executeQuery('UPDATE Purchases SET ? WHERE Id = ?', [data,Id]);
    };
    
};