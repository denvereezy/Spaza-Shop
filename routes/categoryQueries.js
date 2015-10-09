var Promise = require("bluebird");

module.exports = function(connection){
    
    var showQuery = function(query,cb){
        connection.query(query,cb);
    };
    
    var updateQuery = function(query,data,cb){
        connection.query(query,data,cb);
    };
    
    this.categories = function(){ 
        return new Promise(function(resolve,reject){
            showQuery('select * from Categories',function(err,categories){
                if (err) return reject (err);
                    resolve(categories);
            });
        });
    };
    
    this.addCategory = function(data){  
        return new Promise(function(resolve, reject){
            updateQuery('insert into Categories set ?', data, function(err, cb){
                if (err) return reject (err);
                    resolve(cb);
            });
        });
    };
    
    this.editCategory = function(Id){
      return new Promise(function(resolve,reject){
          updateQuery('SELECT * FROM Categories WHERE Id = ?', [Id], function(err,results){
              if (err) return reject (err);
                resolve(results);
            });
        });
    };
    
    this.updateCategory = function(data,Id){
        return new Promise(function(resolve,reject){
            updateQuery('UPDATE Categories SET ? WHERE Id = ?', [data, Id], function(err, cb){
                if (err) return reject (err);
                    resolve(cb);
            });
        });
    };
    
    this.deleteCategory = function(Id){
        return new Promise(function(resolve,reject){
            updateQuery('DELETE FROM Categories WHERE Id = ?', [Id], function(err,rows){
                if (err) return reject (err);
                    resolve(rows);
            });
        });
    };
    
    this.catSales = function(){
      return new Promise(function(resolve,reject){
          showQuery('SELECT  Categories.Name, sum(Sales.Qty) AS TotalQty from Sales INNER JOIN Products ON Sales.Product_id = Products.Id INNER JOIN Categories ON Products.Category_id = Categories.Id GROUP BY Categories.Name', function(err, results) {
              if (err) return reject(err);
                    resolve(results);
            });
        });
    };
};
