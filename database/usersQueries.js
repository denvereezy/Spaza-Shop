var QueryService = require("../database/query-service");

module.exports = function(connection){
   var queryService = new QueryService(connection);
    
    this.usersList = function(){
        return queryService.executeQuery('SELECT * from Users');
    };
    
    this.adminUser = function(id){
        return queryService.executeQuery('UPDATE Users SET User_role = "admin" WHERE Id = ?', [id]);
    };
    
    this.notAdmin = function(id){
        return queryService.executeQuery('UPDATE Users SET User_role = "read-only" WHERE Id = ?', [id]);
    };
    
    this.delete = function(Id){
        return queryService.executeQuery('DELETE FROM Users WHERE Id = ?', [Id]);
    };
    
};