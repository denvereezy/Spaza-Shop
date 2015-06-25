var express = require('express')
    mysql = require('mysql'),
    exphbs  = require('express-handlebars'), 
    myConnection = require('express-myconnection'),
    bodyParser = require('body-parser'),
    spaza = require('./routes/spaza');

var app = express();

var dbOptions = {
     host: 'localhost',
      user: 'root',
      password: '951022',
      port: 3306,
      database: 'spaza_shop'
};


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

//setup middleware
app.use(myConnection(mysql, dbOptions, 'single'));
 //parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
//parse application/json
app.use(bodyParser.json());


app.get('/', function (req, res) {
    res.render('index');
});


app.get('/addEntity', spaza.showAddCat);
app.get('/addSales', spaza.showAddProd);
app.get('/addPurchases', spaza.showAddSupp);


app.get('/products', spaza.showProducts);
app.get('/purchases', spaza.showPurchases);
app.get('/sales', spaza.showSales);
app.get('/suppliers', spaza.showSuppliers);
app.get('/categories', spaza.showCategory);


var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})

