module.exports = function(connection){
    this.findProductByName = function(searchString, cb){

        var searchValue = "%" + searchString + "%";

        connection.query('SELECT * FROM Products where Name Like ?', [searchValue], cb);
    };

    this.findGroupedSales = function(searchString,cb){

        var searchValue = "%" + searchString + "%";

        connection.query('SELECT SUM(Qty) AS TotalQty , Product_Id, Name from Sales s INNER JOIN Products p ON s.Product_Id=p.Id where Name Like ?',[searchValue], cb);

    };
}
