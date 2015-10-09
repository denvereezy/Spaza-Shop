var Promise = require("bluebird");

module.exports = function(connection){
    
    this.signup = function(data){
      return new Promise(function(resolve,reject){
          connection.query('insert into Users set ?', data, function(err, results) {
             if (err) return reject (err);
                     resolve(results);
          });
      });
    };
    
    this.adminSignup = function(data){
      return new Promise(function(resolve,reject){
          connection.query('insert into Users set ?', data, function(err, results) {
              if (err) return reject (err);
                    resolve(results);
          });
      });
    };
    
    this.login = function(username){
      return new Promise(function(resolve,reject){
          connection.query('SELECT * from Users WHERE Username=?', [username], function(err, results) {
                if (err) return reject (err);
                  resolve(results);  
          });
      });
    };
};