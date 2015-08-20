
exports.search_products = function(req, res, next){
    req.getConnection(function(err, connection){
        if(err) return next(err);
        
        var searchValue = "%" + req.params.searchValue + "%";        
        var searchResults = function(err, results){
            if (err) return next(err);
            
            res.render('products_search', {
                username : req.session.user,
                products : results,
                layout : false
            });            
        };

        connection.query('SELECT * FROM Products where Name Like ?', [searchValue], searchResults);
        
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
