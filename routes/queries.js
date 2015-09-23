module.exports = function(connection){
    this.findProductByName = function(searchString, cb){

        var searchValue = "%" + searchString + "%";

        connection.query('SELECT * FROM Products where Name Like ?', [searchValue], cb);
    };

    this.findGroupedSales = function(searchString,cb){

        var searchValue = "%" + searchString + "%";

        connection.query('SELECT SUM(Qty) AS TotalQty , Product_Id, Name from Sales s INNER JOIN Products p ON s.Product_Id=p.Id where Name Like ?',[searchValue], cb);

    };
    
    this.allSales = function(searchString,cb){
        
        var searchValue = "%" + searchString + "%";
        
        connection.query('SELECT Qty AS AmtSold , Sales_date, Sales_price, Name from Sales s INNER JOIN Products p ON s.Product_Id = p.Id where Name Like ?',[searchValue], cb);
        
    };
    
    this.product_earnings = function(searchString,cb){
        
        var searchValue = "%" + searchString + "%";
        
        connection.query('SELECT Name,SUM(Sales_price*Qty) AS TotalEarnings from Sales INNER JOIN Products ON Sales.Product_id = Products.Id where Name Like ?',[searchValue], cb);
    };
    
    this.categories = function(searchString,cb){
        
        searchValue = "%" + searchString + "%";
        
        connection.query('select * from Categories where Name Like ?',[searchValue],cb);
        
    };
    
        this.suppliers = function(searchString,cb){
        
        searchValue = "%" + searchString + "%";
        
        connection.query('select * from Suppliers where Name Like ?',[searchValue],cb);
        
    };
}
