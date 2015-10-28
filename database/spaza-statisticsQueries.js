var Promise = require("bluebird");
module.exports = function(connection){

    var showQuery = function(query, params){
        return new Promise(function(resolve, reject){
            params = params || {};
            connection.query(query, params, function(err, results){
                if(err) return reject(err);
                resolve(results);
            });
        });
    };
    
    this.popularProduct = function(){
        return showQuery('SELECT SUM(Qty) AS TotalQty , Product_Id, Name from Sales s INNER JOIN Products p ON s.Product_Id = p.Id GROUP BY Name ORDER BY SUM(Qty) DESC LIMIT 0,1');
    };
    
    this.leastPopularPrd = function(){
        return showQuery('SELECT SUM(Qty) AS TotalQty , Product_Id, Name from Sales s INNER JOIN Products p ON s.Product_Id = p.Id GROUP BY Name ORDER BY SUM(Qty) ASC LIMIT 0,1');
    };
    
    this.prdEarnings = function(){
        return showQuery('SELECT Name,SUM(Sales_price*Qty) AS TotalEarnings from Sales INNER JOIN Products ON Sales.Product_id = Products.Id GROUP BY Name ORDER BY TotalEarnings');
    };
    
    this.popularCategory = function(){
        return showQuery('SELECT  Categories.Name, sum(Sales.Qty) AS TotalQty from Sales INNER JOIN Products ON Sales.Product_id = Products.Id INNER JOIN Categories ON Products.Category_id = Categories.Id GROUP BY Categories.Name ORDER BY TotalQty DESC LIMIT 0,1');
    };
    
    this.leastPopularCat = function(){
        return showQuery('SELECT  Categories.Name, sum(Sales.Qty) AS TotalQty from Sales INNER JOIN Products ON Sales.Product_id = Products.Id INNER JOIN Categories ON Products.Category_id = Categories.Id GROUP BY Categories.Name ORDER BY TotalQty ASC LIMIT 0,1');
    };
    
    this.categoryEarnings = function(){
        return showQuery('SELECT  Categories.Name, sum(Sales.Qty*Sales_price) AS TotalQty from Sales INNER JOIN Products ON Sales.Product_id = Products.Id INNER JOIN Categories ON Products.Category_id = Categories.Id GROUP BY Categories.Name ORDER BY TotalQty');
    };
    
    this.productGraph = function(){
        return showQuery('SELECT SUM(Qty) AS TotalQty , Product_Id, Name from Sales s INNER JOIN Products p ON s.Product_Id = p.Id GROUP BY Name');
    };
    
    this.categoryGraph = function(){
        return showQuery('SELECT  Categories.Name, sum(Sales.Qty) AS TotalQty from Sales INNER JOIN Products ON Sales.Product_id = Products.Id INNER JOIN Categories ON Products.Category_id = Categories.Id GROUP BY Categories.Name');
    };
};