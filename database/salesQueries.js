var QueryService = require("../database/query-service");

module.exports = function(connection){
    var queryService = new QueryService(connection);
    
    this.showAllSales = function(){
        return queryService.executeQuery('SELECT Qty AS AmtSold ,DATE_FORMAT(Sales_date,"%d %b %y") as Sales_date, Sales_price, Name from Sales s INNER JOIN Products p ON s.Product_Id = p.Id ORDER BY Sales_date DESC');
    };
    
    this.sales = function(){
        return queryService.executeQuery('SELECT SUM(Qty) AS TotalQty , Product_Id, Name from Sales s INNER JOIN Products p ON s.Product_Id = p.Id GROUP BY Name');
    };

    this.products = function(){
        return queryService.executeQuery('SELECT * from Products');
    };
    
    this.add = function(data){
        return queryService.executeQuery('insert into Sales set ?', data);
    };
    
    this.edit = function(Id){
        return queryService.executeQuery('SELECT * FROM Sales WHERE id = ?', [Id]);
    };
    
    this.update = function(data, id){
        return queryService.executeQuery('UPDATE Sales SET ? WHERE Id = ?', [data, id]);
    };
};