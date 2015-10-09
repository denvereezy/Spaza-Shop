var Promise = require("bluebird");

module.exports = function(connection){
   
    var showQuery = function(query,cb){
        connection.query(query,cb);
    };

    var updateQuery = function(query,data,cb){
        connection.query(query,data,cb);
    };
    
  this.usersList = function(){
      return new Promise(function(resolve,reject){
        showQuery('SELECT * from Users', function(err,results){
                  if (err) return reject (err);
                        resolve(results);
            });
      });
  };
    
    this.adminUser = function(id){
      return new Promise(function(resolve,reject){
          updateQuery('UPDATE Users SET User_role = "admin" WHERE Id = ?', id, function(err, results) {
                if (err) return reject (err);
                        resolve(results);
          });
      });
    };
    
    this.notAdmin = function(id){
      return new Promise(function(resolve,reject){
          updateQuery('UPDATE Users SET User_role = "read-only" WHERE Id = ?', id, function(err, results) {
              if (err) return reject (err);
                    resolve(results);
          });
      });
    };
    
    this.delete = function(Id){
      return new Promise(function(resolve,reject){
          updateQuery('DELETE FROM Users WHERE Id = ?', [Id], function(err,results){
              if (err) return reject (err);
                    resolve(results);
          });
      });
    };
    
};