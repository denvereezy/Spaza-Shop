var express = require('express');
var exphbs  = require('express-handlebars');
var Products = require("./productsSold");
var products = new Products('./Nelisa Sales History.csv');

var productMap = products.groupedItems();
var popularProduct = products.mostPopular(productMap);
var items = products.categoryQtySold(productMap);
var leastPopularProduct = products.leastPopular(productMap);
var popularCategory = products.popularCategory(items);
var leastPopularCategory = products.leastPopularCategory(items);

var categories = products.groupedItems();
var cat = products.categoryQtySold(categories);
var app = express();

    // create a route
app.use(express.static('public'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//product list

app.get('/', function(req, res){
	res.render("index");
});

app.get('/graph', function(req, res){
	

	var allCategories = [];
	for (key in cat){
		allCategories.push({
			 name : key,
            		qty : cat[key]
		});	
	}
	res.render("graph", {products : allCategories});
});

app.get('/products', function (req, res) {
    
    var productList = [];

    for(key in productMap){

        productList.push({
            name : key,
            qty : productMap[key]
        });
     
    }
    
    res.render("products",{products : productList} );  
});

//most popular product
app.get('/popular', function (req, res) {
var productList = [];

    for(key in popularProduct){

        productList.push({
            name : key,
            qty : popularProduct[key]
        });
     
    }
  res.render("popular",{products : productList});
});

//least popular product
app.get('/leastpopular', function (req, res) {
var productList = [];

    for(key in leastPopularProduct){

        productList.push({
            name : key,
            qty : leastPopularProduct[key]
        });
     
    }
  res.render("leastpopular",{products : productList});
});

//most popular category
app.get('/popularCategory', function (req, res) {
var productList = [];

    for(key in popularCategory){

        productList.push({
            name : key,
            qty : popularCategory[key]
        });
     
    }
  res.render("popularCategory",{products : productList});
});

// least popular category
 app.get('/leastpopcat', function (req, res) {
var productList = [];

    for(key in leastPopularCategory){

        productList.push({
            name : key,
            qty : leastPopularCategory[key]
        });
     
    }
  res.render("leastpopcat",{products : productList});
});

app.get('/persona', function(req, res){
	res.render("persona");
});

app.get('/site_help', function(req, res){
	res.render("site_help");
});
	
		
   //start the server
   var server = app.listen(8080, function () {
        var host = server.address().address;
        var port = server.address().port;
     console.log('Example app listening at http://%s:%s', host, port);

   });
