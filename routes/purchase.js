exports.show = function (req, res, next) {
    req.getConnection(function(err, connection){
        if (err) 
        	return next(err);
        		connection.query('SELECT Purchase_date,Qty, Purchase_price,s.Name,c.Name as names from Purchases p inner join Products s on p.Product_Id = s.Id inner join Suppliers c on p.Supplier_Id = c.Id order by Purchase_date desc', [], function(err, purchases, fields) {
                    if (err)
                        return next(err);
                        connection.query('SELECT * from Suppliers', [], function(err, supply, fields) {
                        if (err)
                        return next(err);
                    //
                        
                connection.query('SELECT Id, Name FROM Products order by Name', [], function(err, products, fields) {
                    if (err)
                        return next(err);
                        res.render('addPurchase', {
                        products : products,
                        purchases: purchases,
                            //purchase: purchase,
                        Suppliers: supply
                    });
                });
        	});
        });
    });
};

exports.add = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err){ 
			return next(err);
		}
		
		var input = JSON.parse(JSON.stringify(req.body));
		var data = {
                    Supplier_Id:input.Supplier_Id,
                    Product_Id:input.Product_Id,
                    Purchase_date: input.Purchase_date,
                    Purchase_price: input.Purchase_price,
                    Qty:input.Qty
        	};
		connection.query('insert into Purchases set ?', data, function(err, results) {
        		if (err)
              			console.log("Error inserting : %s ",err );
         
          		res.redirect('/addPurchase');
      		});
	});
};

exports.get = function(req, res, next){
	var Id = req.params.Id;
	req.getConnection(function(err, connection){
		connection.query('SELECT * FROM Purchases WHERE Id = ?', [Id], function(err,rows){
			if(err){
    				console.log("Error Selecting : %s ",err );
			}
			res.render('purchase_edit',{page_title:"Edit Customers - Node.js", data : rows[0]});      
		}); 
	});
};

exports.update = function(req, res, next){

	var data = JSON.parse(JSON.stringify(req.body));
    	var Id = req.params.Id;
    	req.getConnection(function(err, connection){
    		connection.query('UPDATE Purchases SET ? WHERE Id = ?', [data, Id], function(err, rows){
    			if (err){
              			console.log("Error Updating : %s ",err );
    			}
          		res.redirect('/addPurchase');
    		});
    		
    });
};

exports.delete = function(req, res, next){
	var Id = req.params.Id;
	req.getConnection(function(err, connection){
		connection.query('DELETE FROM Purchases WHERE Id = ?', [Id], function(err,rows){
			if(err){
    				console.log("Error Selecting : %s ",err );
			}
			res.redirect('/addPurchase');
		});
	});
};
