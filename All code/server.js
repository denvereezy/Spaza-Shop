var express = require('express');
var exphbs  = require('express-handlebars');

var Products = require("./productsSold");
var products = new Products('./Nelisa Sales History.csv');
var productMap = products.groupedItems();
var productCountMap = {};

var app = express();

    // create a route
app.use(express.static('public'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/products', function (req, res) {
    
   var popularProduct = products.mostPopular(productMap);
    
    var productList = [];

    for(key in productMap){

        productList.push({
            name : key,
            qty : productMap[key]
        });
     
    }
    
    res.render("products", {products : productList});  
});

app.get('/popular', function (req, res) {

 var mostPopularCategory = products.mostPopular(productCountMap);

      var product = [];
      for(key in productCountMap){
      product.push({
        name: key,
        qty: mostPopularCategory[key] 
      });
  }
  
  res.render("popular", {popular : product});
});
 
	
	
   //start the server
   var server = app.listen(8080, function () {
        var host = server.address().address;
        var port = server.address().port;
     console.log('Example app listening at http://%s:%s', host, port);

   });
