
var assert = require('assert');
var mysql = require('mysql');

var password = process.env.MYSQL_PWD !== null ? process.env.MYSQL_PWD : 'passw0rd';

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

});