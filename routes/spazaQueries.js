var Promise = require("bluebird");

module.exports = function(connection){
    var showQuery = function(query,cb){
        connection.query(query,cb);
    };
    
    this.popularProduct = function(){
        return new Promise(function(resolve,reject){
            showQuery('SELECT SUM(Qty) AS TotalQty , Product_Id, Name from Sales s INNER JOIN Products p ON s.Product_Id = p.Id 					GROUP BY Name ORDER BY SUM(Qty) DESC LIMIT 0,1', 
                      [], function(err, cb) {
                if (err) return reject (err);
                    resolve(cb);
        });
    });
    };
};