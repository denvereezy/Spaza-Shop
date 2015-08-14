    //product list
    exports.showProductList = function (req, res, next) {
        req.getConnection(function(err, connection){
            if (err) 
                return next(err);
            connection.query('SELECT SUM(Qty) AS TotalQty , Product_Id, Name from Sales s INNER JOIN Products p ON s.Product_Id = p.Id 					GROUP BY Name', 
            [], function(err, results) {
                if (err) return next(err);

                res.render( 'list', {
                    products : results
                });
          });
        });
    };

    //most popular product
    exports.showPopularProduct = function (req, res, next) {
        req.getConnection(function(err, connection){
            if (err) 
                return next(err);
            connection.query('SELECT SUM(Qty) AS TotalQty , Product_Id, Name from Sales s INNER JOIN Products p ON s.Product_Id = p.Id 					GROUP BY Name ORDER BY SUM(Qty) DESC LIMIT 0,1', 
            [], function(err, results) {
                if (err) return next(err);

                res.render( 'popular', {
                    products : results
                });
          });
        });
    };

    //least popular product
    exports.showLeastPopularProduct = function (req, res, next) {
        req.getConnection(function(err, connection){
            if (err) 
                return next(err);
            connection.query('SELECT SUM(Qty) AS TotalQty , Product_Id, Name from Sales s INNER JOIN Products p ON s.Product_Id = p.Id 					GROUP BY Name ORDER BY SUM(Qty) ASC LIMIT 0,1', 
            [], function(err, results) {
                if (err) return next(err);

                res.render( 'leastpopular', {
                    products : results
                });
          });
        });
    };

    //earnings per product
    exports.showEarningsPerProduct = function (req, res, next) {
        req.getConnection(function(err, connection){
            if (err) 
                return next(err);
            connection.query('SELECT Name,SUM(Sales_price*Qty) AS TotalEarnings from Sales INNER JOIN Products ON Sales.Product_id = Products.Id GROUP BY Name ORDER BY TotalEarnings', 
            [], function(err, results) {
                if (err) return next(err);

                res.render( 'earningsPerProduct', {
                    products : results
                });
          });
        });
    };

    //categorylist
    exports.showCategoryList = function (req, res, next) {
        req.getConnection(function(err, connection){
            if (err) 
                return next(err);
            connection.query('SELECT  Categories.Name, sum(Sales.Qty) AS TotalQty from Sales INNER JOIN Products ON Sales.Product_id = Products.Id INNER JOIN Categories ON Products.Category_id = Categories.Id GROUP BY Categories.Name',  [], function(err, results) {
                if (err) return next(err);

                res.render( 'category_sales', {
                    products : results
                });
          });
        });
    };

    //most popular category
    exports.showPopularCategory = function (req, res, next) {
        req.getConnection(function(err, connection){
            if (err) 
                return next(err);
            connection.query('SELECT  Categories.Name, sum(Sales.Qty) AS TotalQty from Sales INNER JOIN Products ON Sales.Product_id = Products.Id INNER JOIN Categories ON Products.Category_id = Categories.Id GROUP BY Categories.Name ORDER BY TotalQty DESC LIMIT 0,1', 
            [], function(err, results) {
                if (err) return next(err);

                res.render( 'popularCategory', {
                    products : results
                });
          });
        });
    };

    //least popular category
    exports.showLeastPopularCategory = function (req, res, next) {
        req.getConnection(function(err, connection){
            if (err) 
                return next(err);
            connection.query('SELECT  Categories.Name, sum(Sales.Qty) AS TotalQty from Sales INNER JOIN Products ON Sales.Product_id = Products.Id INNER JOIN Categories ON Products.Category_id = Categories.Id GROUP BY Categories.Name ORDER BY TotalQty ASC LIMIT 0,1;', 
            [], function(err, results) {
                if (err) return next(err);

                res.render( 'leastpopcat', {
                    products : results
                });
          });
        });
    };

    //earnings per category
    exports.showEarningsPerCategory = function (req, res, next) {
        req.getConnection(function(err, connection){
            if (err) 
                return next(err);
            connection.query('SELECT  Categories.Name, sum(Sales.Qty*Sales_price) AS TotalQty from Sales INNER JOIN Products ON Sales.Product_id = Products.Id INNER JOIN Categories ON Products.Category_id = Categories.Id GROUP BY Categories.Name ORDER BY TotalQty', 
            [], function(err, results) {
                if (err) return next(err);

                res.render( 'earningsPerCategory', {
                    products : results
                });
          });
        });
    };

    //product graph
    exports.showProductGraph = function (req, res, next) {
        req.getConnection(function(err, connection){
            if (err)
                return next(err);
            connection.query('SELECT SUM(Qty) AS TotalQty , Product_Id, Name from Sales s INNER JOIN Products p ON s.Product_Id = p.Id 					GROUP BY Name',  [], function(err, results) {
                if (err) return next(err);

                res.render( 'productGraph', {
                    products : results
                });
          });
        });
    };

    //category graph
    exports.showCategoryGraph = function (req, res, next) {
        req.getConnection(function(err, connection){
            if (err)
                return next(err);
            connection.query('SELECT  Categories.Name, sum(Sales.Qty) AS TotalQty from Sales INNER JOIN Products ON Sales.Product_id = Products.Id INNER JOIN Categories ON Products.Category_id = Categories.Id GROUP BY Categories.Name',  [], function(err, results) {
                if (err) return next(err);

                res.render( 'graph', {
                    products : results
                });
          });
        });
    };
