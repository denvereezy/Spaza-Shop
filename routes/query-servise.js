module.exports = function(connection){
    this.execute = function(query,cb){
            return new Promise(resolve, reject){
                connection.query(query,cb, function(err, results){
                    if(err) return reject(err);
                    resolve(results);
                });
            };
        }
    }
};