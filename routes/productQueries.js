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
          return new Promise(function(resolve, reject) {
              showQuery('SELECT * from Categories', function (err, categories, fields) {
                    if (err) return reject(err);
                        resolve(categories);
              });
          });
      
    };
};