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
    
    this.showAllSales = function(){
        return executeQuery('SELECT Qty AS AmtSold ,DATE_FORMAT(Sales_date,"%d %b %y") as Sales_date, Sales_price, Name from Sales s INNER JOIN Products p ON s.Product_Id = p.Id ORDER BY Sales_date DESC');
    };
    
    this.sales = function(){
        return executeQuery('SELECT SUM(Qty) AS TotalQty , Product_Id, Name from Sales s INNER JOIN Products p ON s.Product_Id = p.Id GROUP BY Name');
    };

    this.products = function(){
        return executeQuery('SELECT * from Products');
    };
    
    this.add = function(data){
        return executeQuery('insert into Sales set ?', data);
    };
    
    this.edit = function(Id){
        return executeQuery('SELECT * FROM Sales WHERE id = ?', [Id]);
    };
    
    this.update = function(data, id){
        return executeQuery('UPDATE Sales SET ? WHERE Id = ?', [data, id]);
    };
};