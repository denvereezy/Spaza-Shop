var Promise = require("bluebird");
var QueryService = require("../database/query-service");
var bcrypt = require('bcrypt');

module.exports = function(connection){
    var queryService  = new QueryService(connection); 
    
    this.signup = function(data){
        return new Promise(function(resolve,reject){
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(data.Password, salt, function(err, hash) {
                    if (err){
                        return console.log(err);
                    }
                    data.Password = hash;
                    connection.query('insert into Users set ?', data, function(err, results) {
                        if (err) return reject (err);
                        resolve(results);
                    });
                });
            });          
        });
    };
    
    this.login = function(username){
        return queryService.executeQuery('SELECT * from Users WHERE Username=?', [username]);      
    };
};
