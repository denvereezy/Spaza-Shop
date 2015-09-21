exports.findProductByName = function(req, res,next){
    req.getConnection(function(err, connection){
        connection.query('SELECT * FROM Products where Name Like ?');
    })
};
