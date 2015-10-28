var Promise = require("bluebird");

module.exports = function(connection){
    
    var searchQuery = function(query, params){
        return new Promise(function(resolve, reject){
            params = params || {};
            connection.query(query, params, function(err, results){
                if(err) return reject(err);
                resolve(results);
            });
        });
    };
    
    this.findProductByName = function(searchValue){
       return searchQuery('SELECT * FROM Products where Name Like ?', [searchValue]);
    };
    

    this.categories = function(searchValue){
       return searchQuery('select * from Categories where Name Like ?',[searchValue]);
    };

    this.suppliers = function(searchValue){
       return searchQuery('select * from Suppliers where Name Like ?',[searchValue]);
    };
    
    this.findGroupedSales = function(searchValue){
       return searchQuery('SELECT SUM(Qty) AS TotalQty , Product_Id, Name from Sales s INNER JOIN Products p ON s.Product_Id=p.Id where Name Like ?',[searchValue]);
    };


    this.allSales = function(searchValue){
       return searchQuery('SELECT Qty AS AmtSold , Sales_date, Sales_price, Name from Sales s INNER JOIN Products p ON s.Product_Id = p.Id where Name Like ?',[searchValue]);
    };

    this.product_earnings = function(searchValue){
       return searchQuery('SELECT Name,SUM(Sales_price*Qty) AS TotalEarnings from Sales INNER JOIN Products ON Sales.Product_id = Products.Id where Name Like ?',[searchValue]);
    };

    this.category_sales = function(searchValue){
       return searchQuery('SELECT  Categories.Name, sum(Sales.Qty) AS TotalQty from Sales INNER JOIN Products ON Sales.Product_id = Products.Id INNER JOIN Categories ON Products.Category_id = Categories.Id where Categories.Name Like ?',[searchValue]);
    };

    this.category_earnings = function(searchValue){
       return searchQuery('SELECT  Categories.Name, sum(Sales.Qty*Sales_price) AS TotalQty from Sales INNER JOIN Products ON Sales.Product_id = Products.Id INNER JOIN Categories ON Products.Category_id = Categories.Id GROUP BY Categories.Name Like ?',[searchValue]);
    };

    this.purchases = function(searchValue){
       return searchQuery('SELECT p.Id, Purchase_date,Qty, Purchase_price,s.Name,c.Name as names from Purchases p inner join Products s on p.Product_Id = s.Id inner join Suppliers c on p.Supplier_Id = c.Id where s.Name Like ? or c.Name Like ?',[searchValue,searchValue]);
    };
}
