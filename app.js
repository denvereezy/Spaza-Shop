var express = require('express');
var exphbs  = require('express-handlebars');
     mysql = require('mysql'), 
     myConnection = require('express-myconnection'),
     bodyParser = require('body-parser'),
     Products = require('./routes/Products'),
     spaza = require('./routes/spaza');
     Categories = require('./routes/categories');
     
var app = express();


var dbOptions = {
      host: 'localhost',
      user: 'green_grocer',
      password: 'password',
      port: 3306,
      database: 'spaza'
};

    // create a route
app.use(myConnection(mysql, dbOptions, 'single'));
app.use(express.static('public'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//setup middleware
app.use(myConnection(mysql, dbOptions, 'single'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.get('/products_list', Products.show);
//app.get('/products', products.show);
app.get('/Products/edit/:id', Products.get);
app.post('/Products/update/:id', Products.update);
app.post('/Products/add', Products.add);
//this should be a post but this is only an illustration of CRUD - not on good practices
app.get('/Products/delete/:id', Products.delete);

app.get('/category_list', Categories.show);
//app.get('/products', products.show);
app.get('/Categories/edit/:Id', Categories.get);
app.post('/Categories/update/:Id', Categories.update);
app.post('/Categories/add', Categories.add);
//this should be a post but this is only an illustration of CRUD - not on good practices
app.get('/Categories/delete/:Id', Categories.delete);

app.get('/list', spaza.showProductList);
app.get('/category_sales', spaza.showCategoryList);
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
