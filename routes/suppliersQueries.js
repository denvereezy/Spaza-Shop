var Promise = require("bluebird");

module.exports = function(connection){

    var showQuery = function(query,cb){
        connection.query(query,cb);
    };

    var updateQuery = function(query,data,cb){
        connection.query(query,data,cb);
    };
    
    this.suppliersList = function(){
      return new Promise(function(resolve,reject){
          showQuery('SELECT * from Suppliers', function(err,results){
            if (err) return reject (err);
                resolve(results);
          });
      });
    };
    
    this.addCategory = function(data){
      return new Promise(function(resolve,reject){
          updateQuery('insert into Suppliers set ?', data, function(err, results) {
             if (err) return reject (err);
                resolve(results);
          });
      });
    };
    
    this.editCategory = function(Id){
      return new Promise(function(resolve,reject){
          updateQuery('SELECT * FROM Suppliers WHERE Id = ?', [Id], function(err,results){
              if (err) return reject (err);
              resolve(results);
          });
      });
    };
    
    this.updateCategory = function(data,Id){
      return new Promise(function(resolve,reject){
          updateQuery('UPDATE Suppliers SET ? WHERE Id = ?', [data, Id], function(err, results){
                if (err) return reject (err);
                    resolve(results);
          });
      });
    };
    
    this.deleteCategory = function(Id){
      return new Promise(function(resolve,reject){
          updateQuery('DELETE FROM Suppliers WHERE Id = ?', [Id], function(err,results){
              if (err) return reject (err);
                resolve(results);
          });
      });
    };
};