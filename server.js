var express = require('express'),
    exphbs  = require('express-handlebars'),
    app = express(),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    mysql = require('mysql'),
    bcrypt = require('bcrypt'),
    compression = require('compression'),
    myConnection = require('express-myconnection'),
    users = require('./routes/users'),
    login = require('./routes/login'),
    Products = require('./routes/Products'),
    spazaStatistics = require('./routes/spaza-statistics'),
    Categories = require('./routes/categories'),
    sales = require('./routes/sales'),
    suppliers = require('./routes/suppliers'),
    purchase = require('./routes/purchase'),
    search = require('./routes/search'),
    queries = require('./database/searchQueries'),
    LoginDataService = require('./database/loginQueries'),
    SpazaDataService = require('./database/spaza-statisticsQueries'),
    connectionProvider = require('connection-provider'),
    ProductDataService = require('./database/productQueries'),
    CategoryDataService = require('./database/categoryQueries'),
    PurchaseDataService = require('./database/purchaseQueries'),
    SalesDataService = require('./database/salesQueries'),
    SearchDataService = require('./database/searchQueries'),
    SuppliersDataService = require('./database/suppliersQueries'),
    UsersDataService = require('./database/usersQueries');

var dbOptions = {
      host: 'localhost',
      user: 'root',
      password: '951022',
      port: 3306,
      database: 'spaza_shop'
};

var serviceSetupCallback = function(connection){
     return {
        loginDataService     : new LoginDataService(connection),
        spazaDataServise     : new SpazaDataService(connection),
        productDataService   : new ProductDataService(connection),
        categoryDataService  : new CategoryDataService(connection),
        purchaseDataService  : new PurchaseDataService(connection),
        salesDataService     : new SalesDataService(connection),
        searchDataService    : new SearchDataService(connection),
        suppliersDataService : new SuppliersDataService(connection),
        usersDataService     : new UsersDataService(connection)
    }
};

app.use(compression());
app.use(connectionProvider(dbOptions, serviceSetupCallback));
app.use(cookieParser('shhhh, very secret'));
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 3600000 }, resave: true, saveUninitialized: true}));
app.use(express.static('public'));
app.engine('handlebars', exphbs({defaultLayout: "main"}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/products_list',login.userCheck, Products.show);
app.get('/salesPerProduct',login.userCheck, sales.showAllSales);
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

app.get('/category_sales',login.userCheck, Categories.showCategoryList);
app.get('/popular',login.userCheck, spazaStatistics.showPopularProduct);
app.get('/popularCategory',login.userCheck,spazaStatistics.showPopularCategory);
app.get('/productGraph',login.userCheck,spazaStatistics.showProductGraph);
app.get('/graph',login.userCheck,spazaStatistics.showCategoryGraph);
app.get('/leastpopcat',login.userCheck,spazaStatistics.showLeastPopularCategory);
app.get('/leastpopular',spazaStatistics.showLeastPopularProduct);
app.get('/earningsPerCategory',login.userCheck,spazaStatistics.showEarningsPerCategory);
app.get('/earningsPerproduct',login.userCheck,spazaStatistics.showEarningsPerProduct);

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
app.get('/users/admin/:Id',login.userCheck,users.admin);
app.get('/users/notAdmin/:Id',login.userCheck,users.notAdmin);
app.get('/users/delete/:Id',login.userCheck, users.delete);

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
   var server = app.listen(port, function () {
        var host = server.address().address;
        var port = server.address().port;
        console.log('Example app listening at http://%s:%s', host, port);
   });
