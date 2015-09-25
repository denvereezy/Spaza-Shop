var Queries = require('../routes/searchQueries');

exports.search_products = function( req, res, next ) {
    req.getConnection(function(err, connection){
        if(err) return next(err);
        
        var searchValue = req.params.searchValue;
        var searchResultsCb = function(err, results){
            if (err) return next(err);
            
            res.render('products_search', {
                username : req.session.user,
                products : results,
                layout : false
            });            
        };


        var queries = new Queries(connection);
        queries.findProductByName(searchValue, searchResultsCb);
        
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

          var querieList = new Queries(connection);
            querieList.findGroupedSales(searchValue, searchResults);
        
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

            var querieList = new Queries(connection);
            querieList.allSales(searchValue, searchResults);
        
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

        var querieList = new Queries(connection);
            querieList.product_earnings(searchValue, searchResults);
        
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

        var allCategories = new Queries(connection);
        allCategories.categories(searchValue,searchResults);
        
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

        var allCategories = new Queries(connection);
        allCategories.category_sales(searchValue,searchResults);
        
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

        var categoryEarnings = new Queries(connection);
        categoryEarnings.category_earnings(searchValue,searchResults);
        
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

         var querieList = new Queries(connection);
            querieList.suppliers(searchValue, searchResults);
        
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

        var allPurchases = new Queries(connection);
        allPurchases.purchases(searchValue,searchResults);
        
    })
};
