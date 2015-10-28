var Promise = require("bluebird");

module.exports = function(connection){
   
    var showQuery = function(query, params){
        return new Promise(function(resolve, reject){
            params = params || {};
            connection.query(query, params, function(err, results){
                if(err) return reject(err);
                resolve(results);
            });
        });
    };
    
    this.usersList = function(){
        return showQuery('SELECT * from Users');
    };
    
    this.adminUser = function(id){
        return showQuery('UPDATE Users SET User_role = "admin" WHERE Id = ?', [id]);
    };
    
    this.notAdmin = function(id){
        return showQuery('UPDATE Users SET User_role = "read-only" WHERE Id = ?', [id]);
    };
    
    this.delete = function(Id){
        return showQuery('DELETE FROM Users WHERE Id = ?', [Id]);
    };
    
};