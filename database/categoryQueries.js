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
    
    this.categories = function(){ 
        return executeQuery('select * from Categories');
    };
    
    this.addCategory = function(data){  
        return executeQuery('insert into Categories set ?', data);
    };

    this.editCategory = function(Id){
        return executeQuery('SELECT * FROM Categories WHERE Id = ?', [Id]);
    };

    this.updateCategory = function(data,Id){
        return executeQuery('UPDATE Categories SET ? WHERE Id = ?', [data, Id]);
    };

    this.deleteCategory = function(Id){
        return executeQuery('DELETE FROM Categories WHERE Id = ?', [Id]);
    };

    this.catSales = function(){
        return executeQuery('SELECT  Categories.Name, sum(Sales.Qty) AS TotalQty from Sales INNER JOIN Products ON Sales.Product_id = Products.Id INNER JOIN Categories ON Products.Category_id = Categories.Id GROUP BY Categories.Name');
    };
};
