var Promise = require("bluebird");

module.exports = function (connection) {

    var executeQuery = function(query, params){
        return new Promise(function(resolve, reject){
            params = params || {};
            connection.query(query, params, function(err, results){
                if(err) return reject(err);
                resolve(results);
            });
        });
    };
    
    this.productList = function () {
        return executeQuery('SELECT * from Products order by Id desc');
    };
    
    this.categoryList = function() {
        return executeQuery('SELECT * from Categories');
    };
    
    this.addProduct = function(data){
        return executeQuery('insert into Products set ?',data);
    };
    
    this.edit = function(Id){
        return executeQuery('SELECT * FROM Products WHERE Id = ?', [Id]);
    };
    
    this.update = function(data,Id){
        return executeQuery('UPDATE Products SET ? WHERE Id = ?', [data, Id]);
    };
    
    this.delete = function(Id){
        return executeQuery('DELETE FROM Products WHERE Id = ?', [Id]);
    };
};