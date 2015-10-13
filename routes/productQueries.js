var Promise = require("bluebird");

module.exports = function (connection) {

    var showQuery = function (query, cb) {
        connection.query(query, cb);
    };

    var updateQuery = function (query, data, cb) {
        connection.query(query, data, cb);
    };
    
    this.productList = function () {
      return new Promise(function (resolve, reject) {
          showQuery('SELECT * from Products order by Id desc', function(err, results, fields) {
                if (err) return reject(err);
                    resolve(results);
            });
        });  
    };
    
    this.categoryList = function() {
        return new Promise(function(resolve, reject) {
            showQuery('SELECT * from Categories', function (err, results, fields) {
                if (err) return reject(err);
                    resolve(results);
            });
        });
    };
    
    this.addProduct = function(data){
      return new Promise(function(resolve,reject){
          updateQuery('insert into Products set ?', data, function(err, results) {
             if (err) return reject (err);
                resolve(results);
           });
       });
    };
    
    this.edit = function(Id){
      return new Promise(function(resolve,reject){
          updateQuery('SELECT * FROM Products WHERE Id = ?', [Id], function(err,results){
             if (err) return reject (err);
                resolve(results)
            });
        });
    };
    
    this.update = function(data,Id){
      return new Promise(function(resolve,reject){
          updateQuery('UPDATE Products SET ? WHERE Id = ?', [data, Id], function(err, results){
            if (err) return reject (err); 
                resolve(results);
            });
        });
    };
    
    this.delete = function(Id){
      return new Promise(function(resolve,reject){
          updateQuery('DELETE FROM Products WHERE Id = ?', [Id], function(err,results){
              if (err) return reject (err)
                  resolve(results);
           });
        });
    };
};