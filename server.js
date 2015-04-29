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
var prodQtyMap = products.groupedItems();
var categoryQty = products.categoryQtySold(prodQtyMap);

var prices = products.earningsPerProduct()

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

    for(key in categoryQty){

        allCategories.push({
            name : key,
            qty : categoryQty[key]
        });
     
    }
	res.render("graph", {products : allCategories} );
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
var popular = [];

    for(key in popularProduct){

        popular.push({
            name : key,
            qty : popularProduct[key]
        });
     
    }
  res.render("popular",{products : popular});
});

//least popular product
app.get('/leastpopular', function (req, res) {
var leastPop = [];

    for(key in leastPopularProduct){

        leastPop.push({
            name : key,
            qty : leastPopularProduct[key]
        });
     
    }
  res.render("leastpopular",{products : leastPop});
});

app.get('/earningsPerProduct', function (req, res) {
    var allPrices = []
        for(key in prices){
            allPrices.push({
                name : key,
                salesTotal : prices[key]
            })
        }
    res.render("earningsPerProduct")
    })

 //category list
 app.get('/category_list', function (req, res) {
var categoryList = [];

    for(key in categoryQty){

        categoryList.push({
            name : key,
            qty : categoryQty[key]
        });
     
    }
  res.render("category_list",{products : categoryList});
});


//most popular category
app.get('/popularCategory', function (req, res) {
var mostPop = [];

    for(key in popularCategory){

        mostPop.push({
            name : key,
            qty : popularCategory[key]
        });
     
    }
  res.render("popularCategory",{products : mostPop});
});

// least popular category
 app.get('/leastpopcat', function (req, res) {
var leastPopCat = [];

    for(key in leastPopularCategory){

        leastPopCat.push({
            name : key,
            qty : leastPopularCategory[key]
        });
     
    }
  res.render("leastpopcat",{products : leastPopCat});
});
app.get('/earningsPerCategory', function (req, res) {
	res.render("earningsPerCategory")
	})

app.get('/persona', function(req, res){
	res.render("persona");
});

app.get('/site_help', function(req, res){
	res.render("site_help");
});
	//app.listen(3000);
   var port = process.env.PORT || 8080;		
   //start the server
   var server = app.listen(port, function () {
        var host = server.address().address;
        var port = server.address().port;
     	console.log('Example app listeng at http://%s:%s', host, port);

   });
