//var queries = require('../routes/queries');

exports.search_products = function(req, res, next){
    req.getConnection(function(err, connection){
        if(err) return next(err);
        
        var searchValue = "%" + req.params.searchValue + "%";        
        var searchResultsCb = function(err, results){
            if (err) return next(err);
            
            res.render('products_search', {
                username : req.session.user,
                products : results,
                layout : false
            });            
        };

        connection.query('SELECT Categories.Name as cat_name,Products.Name from Categories INNER JOIN Products ON Products.category_Id=Categories.Id where Products.Name Like ? or Categories.name Like ?', [searchValue,searchValue], searchResultsCb);

//        queries.findProductByName(searchValue,searchValue, searchResultsCb );
        
    })
};

exports.search_grouped_sales = function(req, res, next){
    req.getConnection(function(err, connection){
        if(err) return next(err);
        
        var searchValue = "%" + req.params.searchValue + "%";        
        var searchResults = function(err, results){
            if (err) return next(err);
            
            res.render('gsales_search', {
                username : req.session.user,
                products : results,
                layout : false
            });            
        };

        connection.query('SELECT SUM(Qty) AS TotalQty , Product_Id, Name from Sales s INNER JOIN Products p ON s.Product_Id=p.Id where Name Like ?',[searchValue], searchResults);
        
    })
};

exports.search_all_sales = function(req, res, next){
    req.getConnection(function(err, connection){
        if(err) return next(err);
        
        var searchValue = "%" + req.params.searchValue + "%";        
        var searchResults = function(err, results){
            if (err) return next(err);
            
            res.render('allsales_search', {
                username : req.session.user,
                products : results,
                layout : false
            });            
        };

        connection.query('SELECT Qty AS AmtSold , Sales_date, Sales_price, Name from Sales s INNER JOIN Products p ON s.Product_Id = p.Id where Name Like ?',[searchValue], searchResults);
        
    })
};

exports.search_product_earnings = function(req, res, next){
    req.getConnection(function(err, connection){
        if(err) return next(err);
        
        var searchValue = "%" + req.params.searchValue + "%";        
        var searchResults = function(err, results){
            if (err) return next(err);
            
            res.render('earnings_search', {
                username : req.session.user,
                products : results,
                layout : false
            });            
        };

        connection.query('SELECT Name,SUM(Sales_price*Qty) AS TotalEarnings from Sales INNER JOIN Products ON Sales.Product_id = Products.Id where Name Like ?',[searchValue], searchResults);
        
    })
};

exports.search_categories = function(req, res, next){
    req.getConnection(function(err, connection){
        if(err) return next(err);
        
        var searchValue = "%" + req.params.searchValue + "%";        
        var searchResults = function(err, results){
            if (err) return next(err);
            
            res.render('category_search', {
                username : req.session.user,
                products : results,
                layout : false
            });            
        };

        connection.query('SELECT Name FROM Categories where Name Like ?',[searchValue], searchResults);
        
    })
};

exports.search_category_sales = function(req, res, next){
    req.getConnection(function(err, connection){
        if(err) return next(err);
        
        var searchValue = "%" + req.params.searchValue + "%";        
        var searchResults = function(err, results){
            if (err) return next(err);
            
            res.render('category_sales_search', {
                username : req.session.user,
                products : results,
                layout : false
            });            
        };

        connection.query('SELECT  Categories.Name, sum(Sales.Qty) AS TotalQty from Sales INNER JOIN Products ON Sales.Product_id = Products.Id INNER JOIN Categories ON Products.Category_id = Categories.Id where Categories.Name Like ?',[searchValue], searchResults);
        
    })
};

exports.search_category_earnings = function(req, res, next){
    req.getConnection(function(err, connection){
        if(err) return next(err);
        
        var searchValue = "%" + req.params.searchValue + "%";        
        var searchResults = function(err, results){
            if (err) return next(err);
            
            res.render('category_earnings_search', {
                username : req.session.user,
                products : results,
                layout : false
            });            
        };

        connection.query('SELECT  Categories.Name, sum(Sales.Qty*Sales_price) AS TotalQty from Sales INNER JOIN Products ON Sales.Product_id = Products.Id INNER JOIN Categories ON Products.Category_id = Categories.Id GROUP BY Categories.Name Like ?',[searchValue], searchResults);
        
    })
};

exports.search_suppliers = function(req, res, next){
    req.getConnection(function(err, connection){
        if(err) return next(err);
        
        var searchValue = "%" + req.params.searchValue + "%";        
        var searchResults = function(err, results){
            if (err) return next(err);
            
            res.render('suppliers_search', {
                username : req.session.user,
                products : results,
                layout : false
            });            
        };

        connection.query('SELECT * FROM Suppliers where Name Like ?', [searchValue], searchResults);
        
    })
};

exports.search_purchases = function(req, res, next){
    req.getConnection(function(err, connection){
        if(err) return next(err);
        
        var searchValue = "%" + req.params.searchValue + "%";        
        var searchResults = function(err, results){
            if (err) return next(err);
            
            res.render('purchases_search', {
                username : req.session.user,
                products : results,
                layout : false
            });            
        };

        connection.query('SELECT p.Id, Purchase_date,Qty, Purchase_price,s.Name,c.Name as names from Purchases p inner join Products s on p.Product_Id = s.Id inner join Suppliers c on p.Supplier_Id = c.Id where s.Name Like ? or c.Name Like ?', [searchValue,searchValue], searchResults);
        
    })
};
