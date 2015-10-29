var QueryService = require("../database/query-service");
module.exports = function(connection){
    var queryService = new QueryService(connection);
    
    this.popularProduct = function(){
        return queryService.executeQuery('SELECT SUM(Qty) AS TotalQty , Product_Id, Name from Sales s INNER JOIN Products p ON s.Product_Id = p.Id GROUP BY Name ORDER BY SUM(Qty) DESC LIMIT 0,1');
    };
    
    this.leastPopularPrd = function(){
        return queryService.executeQuery('SELECT SUM(Qty) AS TotalQty , Product_Id, Name from Sales s INNER JOIN Products p ON s.Product_Id = p.Id GROUP BY Name ORDER BY SUM(Qty) ASC LIMIT 0,1');
    };
    
    this.prdEarnings = function(){
        return queryService.executeQuery('SELECT Name,SUM(Sales_price*Qty) AS TotalEarnings from Sales INNER JOIN Products ON Sales.Product_id = Products.Id GROUP BY Name ORDER BY TotalEarnings');
    };
    
    this.popularCategory = function(){
        return queryService.executeQuery('SELECT  Categories.Name, sum(Sales.Qty) AS TotalQty from Sales INNER JOIN Products ON Sales.Product_id = Products.Id INNER JOIN Categories ON Products.Category_id = Categories.Id GROUP BY Categories.Name ORDER BY TotalQty DESC LIMIT 0,1');
    };
    
    this.leastPopularCat = function(){
        return queryService.executeQuery('SELECT  Categories.Name, sum(Sales.Qty) AS TotalQty from Sales INNER JOIN Products ON Sales.Product_id = Products.Id INNER JOIN Categories ON Products.Category_id = Categories.Id GROUP BY Categories.Name ORDER BY TotalQty ASC LIMIT 0,1');
    };
    
    this.categoryEarnings = function(){
        return queryService.executeQuery('SELECT  Categories.Name, sum(Sales.Qty*Sales_price) AS TotalQty from Sales INNER JOIN Products ON Sales.Product_id = Products.Id INNER JOIN Categories ON Products.Category_id = Categories.Id GROUP BY Categories.Name ORDER BY TotalQty');
    };
    
    this.productGraph = function(){
        return queryService.executeQuery('SELECT SUM(Qty) AS TotalQty , Product_Id, Name from Sales s INNER JOIN Products p ON s.Product_Id = p.Id GROUP BY Name');
    };
    
    this.categoryGraph = function(){
        return queryService.executeQuery('SELECT  Categories.Name, sum(Sales.Qty) AS TotalQty from Sales INNER JOIN Products ON Sales.Product_id = Products.Id INNER JOIN Categories ON Products.Category_id = Categories.Id GROUP BY Categories.Name');
    };
};