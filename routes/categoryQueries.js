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
//          var Id = req.params.Id;
          updateQuery('SELECT * FROM Categories WHERE Id = ?', [Id], function(err,cb){
              if (err) return reject (err);
                resolve(cb);
          });
    });
    };
};
