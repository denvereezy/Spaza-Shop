var express = require('express'),
    exphbs  = require('express-handlebars'),
    app = express(),
    cookieParser = require('cookie-parser'),
    session = require('express-session'), 
    bodyParser = require('body-parser'),
    mysql = require('mysql'),
    bcrypt = require('bcrypt'),
    myConnection = require('express-myconnection'),
    users = require('./routes/users'),
    login = require('./routes/login'),
    Products = require('./routes/Products'),
    spaza = require('./routes/spaza'),
    Categories = require('./routes/categories'),
    sales = require('./routes/sales'),
    salesPerProduct = require('./routes/salesPerProduct'),
    suppliers = require('./routes/suppliers'),
    purchase = require('./routes/purchase'),
    search = require('./routes/search'),
    queries = require('./routes/queries');
    

var dbOptions = {
      host: 'localhost',
      user: 'root',
      password: '951022',
      port: 3306,
      database: 'spaza_shop'
};

app.use(myConnection(mysql, dbOptions, 'single'));
app.use(cookieParser('shhhh, very secret'));
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 3600000 }, resave: true, saveUninitialized: true})); -
app.use(express.static('public'));
app.engine('handlebars', exphbs({defaultLayout: "main"}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/products_list',login.userCheck, Products.show);
app.get('/salesPerProduct',login.userCheck, salesPerProduct.show);
app.get('/Products/products_edit/:Id',login.userCheck, Products.get);
app.post('/Products/update/:Id',login.userCheck, Products.update);
app.post('/Products/add',login.userCheck, Products.add);
app.get('/Products/delete/:Id',login.userCheck, Products.delete);

app.get('/category_list',login.userCheck, Categories.show);
app.get('/Categories/edit/:Id',login.userCheck, Categories.get);
app.post('/Categories/update/:Id',login.userCheck, Categories.update);
app.post('/Categories/add',login.userCheck, Categories.add);
app.get('/Categories/delete/:Id',login.userCheck, Categories.delete);

app.get('/list',login.userCheck, sales.show);
app.post('/sales/update/:Id',sales.update);
app.post('/sales/add',sales.add);

app.get('/category_sales',login.userCheck, spaza.showCategoryList);
app.get('/popular',login.userCheck, spaza.showPopularProduct);
app.get('/popularCategory',login.userCheck,spaza.showPopularCategory);
app.get('/productGraph',login.userCheck,spaza.showProductGraph);
app.get('/graph',login.userCheck,spaza.showCategoryGraph);
app.get('/leastpopcat',login.userCheck,spaza.showLeastPopularCategory);
app.get('/leastpopular',spaza.showLeastPopularProduct);
app.get('/earningsPerCategory',login.userCheck,spaza.showEarningsPerCategory);
app.get('/earningsPerproduct',login.userCheck,spaza.showEarningsPerProduct);

app.get('/suppliers',login.userCheck,suppliers.show);
app.post('/suppliers/update/:Id',suppliers.update);
app.post('/suppliers/add',suppliers.add);
app.get('/suppliers/delete/:Id', suppliers.delete);
app.get('/suppliers/suppliers_edit/:Id', suppliers.get);

app.get('/addPurchase',login.userCheck,purchase.show);
app.post('/purchase/update/:Id',login.userCheck,purchase.update);
app.post('/purchase/add',login.userCheck,purchase.add);
app.get('/purchase/delete/:Id', login.userCheck,purchase.delete);
app.get('/purchase/purchase_edit/:purchase_Id',login.userCheck, purchase.get);

app.get('/users',login.userCheck, users.show);
app.post('/users/update/:Id',login.userCheck,users.update);
app.get('/users/admin/:Id',login.userCheck,users.admin);
app.get('/users/notAdmin/:Id',login.userCheck,users.notAdmin);
app.get('/users/delete/:Id',login.userCheck, users.delete);
app.get('/users/users_edit/:user_Id',login.userCheck, users.get);

app.get('/products/search/:searchValue',login.userCheck, search.search_products);
app.get('/suppliers/search/:searchValue',login.userCheck, search.search_suppliers);
app.get('/sales/search/:searchValue',login.userCheck, search.search_grouped_sales);
app.get('/allsales/search/:searchValue',login.userCheck, search.search_all_sales);
app.get('/product_earnings/search/:searchValue',login.userCheck, search.search_product_earnings);

app.get('/categories/search/:searchValue',login.userCheck, search.search_categories);
app.get('/category_sales/search/:searchValue',login.userCheck, search.search_category_sales);
app.get('/category_earnings/search/:searchValue',login.userCheck, search.search_category_earnings);
app.get('/purchases/search/:searchValue',login.userCheck, search.search_purchases);

app.get("/sign_up", function(req, res){

  res.render("sign_up", {layout : 'mainLogin'});

})
app.post('/sign_up', login.signup);

app.get('/admin_signup', function(req, res, next){
        res.render('admin_signup',{layout: 'mainLogin'});
}); 
app.post('/admin_signup',login.adminSignup); 

app.get('/', function(req, res) {
	

    res.render('login', {
        layout: false,

    });
});
app.post("/login", login.userLogin); 


app.use(login.userCheck);

app.get('/home', function(req, res) {
    res.render('index',{ user:req.session.user, role:req.session.role });
});


app.get('/logout', function(req, res){ 
     delete req.session.user
     res.redirect("/");	
});


 var port = process.env.PORT || 8090;		
   //start the server
   var server = app.listen(port, function () {
        var host = server.address().address;
        var port = server.address().port;
        console.log('Example app listening at http://%s:%s', host, port);

   });
