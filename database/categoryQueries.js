var QueryService = require("../database/query-service");

module.exports = function(connection){
  var queryService = new QueryService(connection);
    
    this.categories = function(){ 
        return queryService.executeQuery('select * from Categories');
    };
    
    this.addCategory = function(data){  
        return queryService.executeQuery('insert into Categories set ?', data);
    };

    this.editCategory = function(Id){
        return queryService.executeQuery('SELECT * FROM Categories WHERE Id = ?', [Id]);
    };

    this.updateCategory = function(data,Id){
        return queryService.executeQuery('UPDATE Categories SET ? WHERE Id = ?', [data, Id]);
    };

    this.deleteCategory = function(Id){
        return queryService.executeQuery('DELETE FROM Categories WHERE Id = ?', [Id]);
    };

    this.catSales = function(){
        return queryService.executeQuery('SELECT  Categories.Name, sum(Sales.Qty) AS TotalQty from Sales INNER JOIN Products ON Sales.Product_id = Products.Id INNER JOIN Categories ON Products.Category_id = Categories.Id GROUP BY Categories.Name');
    };
};
