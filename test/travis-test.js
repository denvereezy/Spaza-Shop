
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

  it("should pass", function(done){

    connection.query('select count(*) as userCount from users', function(err, users) {

        console.log(err);

        assert.equal(1, users[0].userCount);
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
       it('should return supplier searched', function(done){
        queries.suppliers('o',function(err,results){
            assert.equal(err,null);
            
            var ifExists = _.any(results, {'Name': 'HomeMade'});
            assert(ifExists);
            done();
        });
    });
       it('should return a list of products containing "ea" ', function(done){
        queries.findProductByName('ea', function(err, results){
            assert.equal(err, null);

            var ifExists = _.any(results, { 'Name': 'Bread'});
            assert(ifExists, "bread should be there...");
            done();
        });
  });
    
    it('should return category Beverages ', function(done){
        queries.categories('be', function(err, results){
            var ifExists = _.any(results, { 'Name': 'Beverages'});
            assert(ifExists, "Beverages should be there...");
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