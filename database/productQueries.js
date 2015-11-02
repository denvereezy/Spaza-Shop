var QueryService = require("../database/query-service");

module.exports = function (connection) {
    var queryService = new QueryService(connection);
   
    this.productList = function () {
        return queryService.executeQuery('SELECT * from Products order by Id desc');
    };
    
    this.categoryList = function() {
        return queryService.executeQuery('SELECT * from Categories');
    };
    
    this.addProduct = function(data){
        return queryService.executeQuery('insert into Products set ?',data);
    };
    
    this.edit = function(Id){
        return queryService.executeQuery('SELECT * FROM Products WHERE Id = ?', [Id]);
    };
    
    this.update = function(data,Id){
        return queryService.executeQuery('UPDATE Products SET ? WHERE Id = ?', [data, Id]);
    };
    
    this.delete = function(Id){
        return queryService.executeQuery('DELETE FROM Products WHERE Id = ?', [Id]);
    };
};
