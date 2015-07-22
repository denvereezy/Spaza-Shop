var express = require('express');
var exphbs  = require('express-handlebars');
     mysql = require('mysql'), 
     myConnection = require('express-myconnection'),
     bodyParser = require('body-parser'),
     Products = require('./routes/Products'),
     spaza = require('./routes/spaza');
     Categories = require('./routes/categories');
     sales = require('./routes/sales');
     salesPerProduct = require('./routes/salesPerProduct');
     suppliers = require('./routes/suppliers');
     purchase = require('./routes/purchase');
     
var app = express();


var dbOptions = {
      host: 'localhost',
      user: 'root',
      password: '951022',
      port: 3306,
      database: 'spaza_shop'
};

    // create a route
//app.use(myConnection(mysql, dbOptions, 'single'));
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
app.get('/salesPerProduct', salesPerProduct.show);
app.get('/Products/products_edit/:Id', Products.get);
app.post('/Products/update/:Id', Products.update);
app.post('/Products/add', Products.add);
//this should be a post but this is only an illustration of CRUD - not on good practices
app.get('/Products/delete/:Id', Products.delete);

app.get('/category_list', Categories.show);
//app.get('/products', products.show);
app.get('/Categories/edit/:Id', Categories.get);
app.post('/Categories/update/:Id', Categories.update);
app.post('/Categories/add', Categories.add);
//this should be a post but this is only an illustration of CRUD - not on good practices
app.get('/Categories/delete/:Id', Categories.delete);

app.get('/list', sales.show);
//app.get('/sales/edit/:Id',sales.get);
app.post('/sales/update/:Id',sales.update);
app.post('/sales/add',sales.add);
//app.get('/sales/delete/:Id',sales.delete);
app.get('/category_sales', spaza.showCategoryList);
app.get('/popular', spaza.showPopularProduct);
app.get('/popularCategory',spaza.showPopularCategory);
app.get('/productGraph',spaza.showProductGraph);
app.get('/graph',spaza.showCategoryGraph);
app.get('/leastpopcat',spaza.showLeastPopularCategory);
app.get('/leastpopular',spaza.showLeastPopularProduct);
app.get('/earningsPerCategory',spaza.showEarningsPerCategory);
app.get('/earningsPerproduct',spaza.showEarningsPerProduct);

app.get('/suppliers',suppliers.show);
app.post('/suppliers/update/:Id',suppliers.update);
app.post('/suppliers/add',suppliers.add);
app.get('/suppliers/delete/:Id', suppliers.delete);
app.get('/suppliers/suppliers_edit/:Id', suppliers.get);

app.get('/addPurchase',purchase.show);
app.post('/purchase/update/:Id',purchase.update);
app.post('/purchase/add',purchase.add);
app.get('/purchase/delete/:Id', purchase.delete);
//app.post('/purchase/purchase_edit/:Id', purchase.update);
app.get('/purchase/purchase_edit/:purchase_Id', purchase.get);

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

