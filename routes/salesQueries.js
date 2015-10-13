var Promise = require("bluebird");

module.exports = function(connection){
  
    var showQuery = function (query, cb) {
        connection.query(query, cb);
    };

    var updateQuery = function (query, data, cb) {
        connection.query(query, data, cb);
    };
    
    this.showAllSales = function(){
        return new Promise(function(resolve,reject){
            showQuery('SELECT Qty AS AmtSold ,DATE_FORMAT(Sales_date,"%d %b %y") as Sales_date, Sales_price, Name from Sales s INNER JOIN Products p ON s.Product_Id = p.Id ORDER BY Sales_date DESC  ', function(err, results, fields) {
                if (err) return reject (err)
                    resolve(results);
            });
        });
    };
    
    this.sales = function(){
      return new Promise(function(resolve,reject){
          showQuery('SELECT SUM(Qty) AS TotalQty , Product_Id, Name from Sales s INNER JOIN Products p ON s.Product_Id = p.Id GROUP BY Name', function(err, results, fields) {
            if (err) return reject (err)
                resolve(results);
            });
        });
    };

    this.products = function(){
      return new Promise(function(resolve,reject){
          showQuery('SELECT * from Products', function(err,results){
             if (err) return reject (err)
                resolve(results);
            });
        });
    };
    
    this.add = function(data){
        return new Promise(function(resolve,reject){
            updateQuery('insert into Sales set ?', data, function(err, results) {
                if (err) return reject (err)
                    resolve(results);
            });
        });
    };
    
    this.edit = function(Id){
        return new Promise(function(resolve,reject){
            updateQuery('SELECT * FROM Sales WHERE id = ?', [Id], function(err,results){
                if (err) return reject (err)
                    resolve(results);
            });
        });
    };
    
    this.update = function(data, id){
        return new Promise(function(resolve,reject){
            updateQuery('UPDATE Sales SET ? WHERE Id = ?', [data, id], function(err, results){
                if (err) return reject (err)
                    resolve(results);
            });
        });
    };
};