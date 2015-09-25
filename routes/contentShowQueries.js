module.exports = function(connection){
    this.showproducts = function(){
      
        connection.query('SELECT SUM(Qty) AS TotalQty , Product_Id, mame from Sales s INNER JOIN Products p ON s.Product_Id = p.Id GROUP BY Name', []);
    };
};
