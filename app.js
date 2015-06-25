var express = require('express');
var exphbs  = require('express-handlebars');
mysql = require('mysql'), 
myConnection = require('express-myconnection'),
//bodyParser = require('body-parser'),
spaza = require('./routes/spaza');
var app = express();


var dbOptions = {
      host: 'localhost',
      user: 'green_grocer',
      password: 'password',
      port: 3306,
      database: 'spaza_shop'
};

    // create a route
app.use(myConnection(mysql, dbOptions, 'single'));
app.use(express.static('public'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


app.get('/products', spaza.showProductList);
app.get('/category_list', spaza.showCategoryList);
app.get('/popular', spaza.showPopularProduct);
app.get('/popularCategory',spaza.showPopularCategory);
app.get('/productGraph',spaza.showProductGraph);
app.get('/graph',spaza.showCategoryGraph);
app.get('/leastpopcat',spaza.showLeastPopularCategory);
app.get('/leastpopular',spaza.showLeastPopularProduct);
app.get('/earningsPerCategory',spaza.showEarningsPerCategory);
app.get('/earningsPerproduct',spaza.showEarningsPerProduct);


app.get('/', function(req, res){
	res.render("index");
});

   var port = process.env.PORT || 8090;		
   //start the server
   var server = app.listen(port, function () {
        var host = server.address().address;
        var port = server.address().port;
     	console.log('Example app listening at http://%s:%s', host, port);

   });
