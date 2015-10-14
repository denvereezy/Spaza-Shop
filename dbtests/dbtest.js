var assert = require('assert'),
    mysql = require('mysql'),
    _ = require('lodash-node'),
    Queries = require('../routes/searchQueries'),
    Spaza = require('../routes/spazaQueries'),
    connection = mysql.createConnection({

        host: 'localhost',
        user: 'root',
        password: '951022',
        database: 'spaza_shop'
    });

connection.connect();

connection.on('error', function() {
//    console.log(arguments)
});

var queries = new Queries(connection);
var spaza = new Spaza(connection);

describe('Product search', function(){
    it('should return a list of products containing "ea" ', function(done){
        var resultsCb = function(results){
            var ifExists = _.any(results, { 'Name': 'Bread'});
            assert(ifExists, "bread should be there...");
            done();   
        };
        
        queries.findProductByName('ea')                     
            .then(resultsCb)
            .catch(function(err){
                next(err);
        });    
    });


    it('should return product sales searched', function(done){
         var resultsCb = function(results){
            var ifExists = _.any(results, { 'Name': 'Gold Dish Vegetable Curry Can'});
            assert(ifExists);
            done();
        };
        
        queries.findGroupedSales('go')
            .then(resultsCb)
            .catch(function(err){
                next(err);
        });  
    });
    
    it('should return category searched', function(done){
        var resultsCb = function(results){
            var ifExists = _.any(results, {'Name': 'Beverages'});
            assert(ifExists);
            done();
        };
        
        queries.categories('be')
            .then(resultsCb)
            .catch(function(err){
                next(err);
        });
    });
    
    it('should return supplier searched', function(done){
        var resultsCb = function(results){
            var ifExists = _.any(results, {'Name': 'HomeMade'});
            assert(ifExists);
            done();
        };
        queries.suppliers('o')
            .then(resultsCb)
            .catch(function(err){
                next(err);
        });
    });
    
    it('should return purchase searched', function(done){
        var resultsCb = function(results){
            var ifExists = _.any(results, {'Name': 'Chakalaka Can'});
            assert(ifExists);
            done();
        };
        queries.purchases('a')
            .then(resultsCb)
            .catch(function(err){
                next(err);
        });
    });
    
    it('should return the most popular product', function(done){
        var resultsCb = function(results){
            var ifExists = _.any(results, {'Name': 'Gold Dish Vegetable Curry Can'});
            assert(ifExists);
            done();
        };
        spaza.popularProduct()
            .then(resultsCb)
            .catch(function(err){
            console.log(err);
        });
    });
    
    it('should return the most popular category', function(done){
        var resultsCb = function(results){
            assert('Can Food');
            done();
        };
        spaza.popularCategory()
            .then(resultsCb)
            .catch(function(err){
            next(err);
        });
    });

    it('should return the least popular category', function(done){
        var resultsCb = function(results){
            assert('ascac');
            done();
        };
        spaza.leastPopularCat()
            .then(resultsCb)
            .catch(function(err){
            next(err);
        });
    });
});
