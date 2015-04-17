var express = require('express');
var exphbs  = require('express-handlebars');
var Products = require("./productsSold");
var products = new Products('./Nelisa Sales History.csv');
var app = express();


app.use(express.static('public'));
/*app.get('/', function (req, res) {
  res.send('Hello World!');
});*/
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

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});

