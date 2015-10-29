var QueryService = require("../database/query-service");

module.exports = function(connection){
    var queryService = new QueryService(connection);

    this.suppliersList = function(){
        return queryService.executeQuery('SELECT * from Suppliers');
    };
    
    this.addSupplier = function(data){
        return queryService.executeQuery('insert into Suppliers set ?', data);
    };
    
    this.editSupplier = function(Id){
        return queryService.executeQuery('SELECT * FROM Suppliers WHERE Id = ?', [Id]);
    };
    
    this.updateSupplier = function(data,Id){
        return queryService.executeQuery('UPDATE Suppliers SET ? WHERE Id = ?', [data, Id]);
    };
    
    this.deleteSupplier = function(Id){
        return queryService.executeQuery('DELETE FROM Suppliers WHERE Id = ?', [Id]);
    };
};