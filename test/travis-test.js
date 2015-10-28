
var assert = require('assert');
var mysql = require('mysql');
var _ = require('lodash-node');
var bcrypt = require('bcrypt');
var Login = require('../database/loginQueries');
var Queries = require('../database/searchQueries');
var Spaza = require('../database/spaza-statisticsQueries');
var password = process.env.MYSQL_PWD !== null ? process.env.MYSQL_PWD : 'passw0rd';

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : process.env.MYSQL_USER || 'root',
  password : password,
  database : 'travis_db'
});

 connection.connect();
    var queries = new Queries(connection);
    var spaza = new Spaza(connection);
    var login = new Login(connection);

describe("Test mocha from Travis", function(){
 it('should return a list of products containing "ea" ', function(done){
        var resultsCb = function(results){
            var ifExists = _.any(results, { 'Name': 'Bread'});
            assert(ifExists, "bread should be there...");
            done();   
        };

        queries.findProductByName('ea')                     
            .then(resultsCb)
            .catch(function(err){
            console.log(err);
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
    
    it('should return category sales searched', function(done){
        var resultsCb = function(results){
            var ifExists = _.any(results, {'Name': 'Beverages'});
            assert(ifExists);
            done();
        };

        queries.category_sales('be')
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
            var ifExists = _.any(results, { 'Name': 'Chakalaka Can'});
            assert(ifExists);
            done();
        };

        queries.findGroupedSales('aka')
            .then(resultsCb)
            .catch(function(err){
            next(err);
        });  
    });
    
    it('should return the most popular product', function(done){
        var resultsCb = function(results){
            var ifExists = _.any(results, {'Name': 'Bread'});
            assert(ifExists);
            done();
        };
        spaza.popularProduct()
            .then(resultsCb)
            .catch(function(err){
            console.log(err);
        });
    });
    
    it('should return the least popular product', function(done){
        var resultsCb = function(results){
            var ifExists = _.any(results, {'Name': 'Cream Soda 500ml'});
            assert(ifExists);
            done();
        };
        spaza.leastPopularPrd()
            .then(resultsCb)
            .catch(function(err){
            next(err);
        });
    });
    
    it('should return the most popular category', function(done){
        var resultsCb = function(results){
            var ifExists = _.any(results, {'Name': 'Bakery'});
            assert(ifExists);
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
            var ifExists = _.any(results, {'Name': 'Beverages'});
            assert(ifExists);
            done();
        };
        spaza.leastPopularCat()
            .then(resultsCb)
            .catch(function(err){
            next(err);
        });
    });
       it('should sign up a user and hash the password', function(done){
         var data =  {
             Username: 'travis',
             Password:'123',
             User_role:'read-only'
        }
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(data.Password, salt, function(err, hash) {
                data.Password = hash;
                var resultsCb = function(results){            
                var ifExists = _.any(results,data);
                    assert(data);
                     done();
        };
        login.signup(data)
            .then(resultsCb)
            .catch(function(err){
            console.log(err);
        });
    });
});
    });
});
