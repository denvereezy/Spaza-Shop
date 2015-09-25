
var assert = require('assert');
var mysql = require('mysql'),
      _ = require('lodash-node'),
    Queries = require('../routes/searchQueries'),
    password = process.env.MYSQL_PWD !== null ? process.env.MYSQL_PWD : 'passw0rd';

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : process.env.MYSQL_USER || 'root',
  password : password,
  database : 'travis_db'
});

describe("Test mocha from Travis", function(){

  connection.connect();

  it("should pass", function(done){

    connection.query('select count(*) as userCount from users', function(err, users) {

        console.log(err);

        assert.equal(1, users[0].userCount);
        done();
    });


  });

    it('should return categorie Beverages ', function(done){
        queries.findProductByName('be', function(err, results){
            assert.equal(err, null);

            var ifExists = _.any(results, { 'Name': 'Beverages'});
            assert(ifExists, "Beverages should be there...");
            done();
        });
  });
});