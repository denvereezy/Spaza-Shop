var Promise = require("bluebird");

module.exports = function(connection){

    var executeQuery = function(query, params){
        return new Promise(function(resolve, reject){
            params = params || {};
            connection.query(query, params, function(err, results){
                if(err) return reject(err);
                resolve(results);
            });
        });
    };

    this.suppliersList = function(){
        return executeQuery('SELECT * from Suppliers');
    };
    
    this.addSupplier = function(data){
        return executeQuery('insert into Suppliers set ?', data);
    };
    
    this.editSupplier = function(Id){
        return executeQuery('SELECT * FROM Suppliers WHERE Id = ?', [Id]);
    };
    
    this.updateSupplier = function(data,Id){
        return executeQuery('UPDATE Suppliers SET ? WHERE Id = ?', [data, Id]);
    };
    
    this.deleteSupplier = function(Id){
        return executeQuery('DELETE FROM Suppliers WHERE Id = ?', [Id]);
    };
};