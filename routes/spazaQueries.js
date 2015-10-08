var Promise = require("bluebird");

module.exports = function(connection){
    
    var showQuery = function(query,cb){
        connection.query(query,cb);
    };
    
    this.popularProduct = function(){
        return new Promise(function(resolve,reject){
            showQuery('SELECT SUM(Qty) AS TotalQty , Product_Id, Name from Sales s INNER JOIN Products p ON s.Product_Id = p.Id 					GROUP BY Name ORDER BY SUM(Qty) DESC LIMIT 0,1', function(err, results) {
                if (err) return reject (err);
                    resolve(results);
            });
        });
    };
    
    this.leastPopularPrd = function(){
        return new Promise(function(resolve,reject){
            showQuery('SELECT SUM(Qty) AS TotalQty , Product_Id, Name from Sales s INNER JOIN Products p ON s.Product_Id = p.Id 					GROUP BY Name ORDER BY SUM(Qty) ASC LIMIT 0,1', function(err, results) {
                if (err) return reject (err);
                resolve(results);
            });
        });
    };
    
    this.prdEarnings = function(){
      return new Promise(function(resolve,reject){
          showQuery('SELECT Name,SUM(Sales_price*Qty) AS TotalEarnings from Sales INNER JOIN Products ON Sales.Product_id = Products.Id GROUP BY Name ORDER BY TotalEarnings', function(err, results) {
              if (err) return reject (err);
              resolve(results);
            });
        });
    };
    
    this.popularCategory = function(){
      return new Promise(function(resolve,reject){
          showQuery('SELECT  Categories.Name, sum(Sales.Qty) AS TotalQty from Sales INNER JOIN Products ON Sales.Product_id = Products.Id INNER JOIN Categories ON Products.Category_id = Categories.Id GROUP BY Categories.Name ORDER BY TotalQty DESC LIMIT 0,1', function(err,results) {
              if (err) return reject (err);
                resolve(results);
            });
        });
    };
    
    this.leastPopularCat = function(){
     return new Promise(function(resolve,reject){
         showQuery('SELECT  Categories.Name, sum(Sales.Qty) AS TotalQty from Sales INNER JOIN Products ON Sales.Product_id = Products.Id INNER JOIN Categories ON Products.Category_id = Categories.Id GROUP BY Categories.Name ORDER BY TotalQty ASC LIMIT 0,1', function(err,results) {
             if (err) return reject (err);
             resolve(results);
            });
        });
    };
    
    this.categoryEarnings = function(){
      return new Promise(function(resolve,reject){
          showQuery('SELECT  Categories.Name, sum(Sales.Qty*Sales_price) AS TotalQty from Sales INNER JOIN Products ON Sales.Product_id = Products.Id INNER JOIN Categories ON Products.Category_id = Categories.Id GROUP BY Categories.Name ORDER BY TotalQty', function(err, results) {
              if (err) return reject (err);
                resolve(results);
            });
        });
    };
    
    this.productGraph = function(){
      return new Promise(function(resolve,reject){
          showQuery('SELECT SUM(Qty) AS TotalQty , Product_Id, Name from Sales s INNER JOIN Products p ON s.Product_Id = p.Id 					GROUP BY Name', function(err, results) {
              if (err) return reject (err)
                resolve (results);
            });
        });
    };
    
    this.categoryGraph = function(){
      return new Promise(function(resolve,reject){
          showQuery('SELECT  Categories.Name, sum(Sales.Qty) AS TotalQty from Sales INNER JOIN Products ON Sales.Product_id = Products.Id INNER JOIN Categories ON Products.Category_id = Categories.Id GROUP BY Categories.Name', function(err, results) {
              if (err) return reject (err);
                resolve(results);
            });
        });
    };
};