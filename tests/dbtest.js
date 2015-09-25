var assert = require('assert'),
    mysql = require('mysql'),
    _ = require('lodash-node'),
    Queries = require('../routes/searchQueries'),
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

describe('Product search', function(){
    it('should return a list of products containing "ea" ', function(done){
        queries.findProductByName('ea', function(err, results){
            assert.equal(err, null);

            var ifExists = _.any(results, { 'Name': 'Bread'});
            assert(ifExists, "bread should be there...");
            done();
        });
  });

    it('should return product sales searched', function(done){
        queries.findGroupedSales('go', function(err,results){
            assert.equal(err,null);

            var ifExists = _.any(results, { 'Name': 'Gold Dish Vegetable Curry Can'});
//            console.log(results);
            assert(ifExists);
            done();
        });
    });
    
    it('should return category searched', function(done){
        queries.categories('be',function(err,results){
            assert.equal(err,null);
            
            var ifExists = _.any(results, {'Name': 'Beverages'});
            assert(ifExists);
            done();
        });
    });
    
    it('should return supplier searched', function(done){
        queries.suppliers('o',function(err,results){
            assert.equal(err,null);
            
            var ifExists = _.any(results, {'Name': 'HomeMade'});
            assert(ifExists);
            done();
        });
    });
    
    it('should return purchase searched', function(done){
        queries.purchases('a',function(err,results){
            assert.equal(err,null);
           
            var ifExists = _.any(results, {'Name': 'Chakalaka Can'});
            assert(ifExists);
            done();
        });
    });
});
