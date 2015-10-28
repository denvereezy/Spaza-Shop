module.exports = function(connection){
    this.execute = function(query, params){
            return new Promise(resolve, reject){
                connection.query(query, params, function(err, results){
                    if(err) return reject(err);
                    resolve(results);
                });
            };
        }
    }
};