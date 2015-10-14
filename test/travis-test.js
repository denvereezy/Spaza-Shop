
var assert = require('assert');
var mysql = require('mysql');
var _ = require('lodash-node');
var Queries = require('../routes/searchQueries');
var password = process.env.MYSQL_PWD !== null ? process.env.MYSQL_PWD : 'passw0rd';

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : process.env.MYSQL_USER || 'root',
  password : password,
  database : 'travis_db'
});

describe("Test mocha from Travis", function(){

  connection.connect();
    var queries = new Queries(connection);

//  it("should pass", function(done){
//
//    connection.query('select count(*) as userCount from users', function(err, users) {
//
//        console.log(err);
//
//        assert.equal(1, users[0].userCount);
//        done();
//    });
//
//
//  });

    it('should return supplier searched', function(done){
        var resultsCb = function(results){
            var ifExists = _.any(results, {'Name': 'Makro'});
            assert(ifExists);
            done();
        };
        queries.suppliers('Mak')
            .then(resultsCb)
            .catch(function(err){
            next(err);
        });
    });
    
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
});