
exports.show = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) 
			return next(err);
		   connection.query('SELECT * from Suppliers', [], function(err, results, fields) {
                res.render('purchase', {
                    purchase: results,
                   
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
            		Name : input.Name,
                    
        	};
		connection.query('insert into Suppliers set ?', data, function(err, results) {
        		if (err)
              			console.log("Error inserting : %s ",err );
         
          		res.redirect('/purchase');
      		});
	});
};

exports.get = function(req, res, next){
	var Id = req.params.Id;
	req.getConnection(function(err, connection){
		connection.query('SELECT * FROM Suppliers WHERE Id = ?', [Id], function(err,rows){
			if(err){
    				console.log("Error Selecting : %s ",err );
			}
			res.render('suppliers_edit',{page_title:"Edit Customers - Node.js", data : rows[0]});      
		}); 
	});
};

exports.update = function(req, res, next){

	var data = JSON.parse(JSON.stringify(req.body));
    	var Id = req.params.Id;
    	req.getConnection(function(err, connection){
    		connection.query('UPDATE Suppliers SET ? WHERE Id = ?', [data, Id], function(err, rows){
    			if (err){
              			console.log("Error Updating : %s ",err );
    			}
          		res.redirect('/purchase');
    		});
    		
    });
};

exports.delete = function(req, res, next){
	var Id = req.params.Id;
	req.getConnection(function(err, connection){
		connection.query('DELETE FROM Suppliers WHERE Id = ?', [Id], function(err,rows){
			if(err){
    				console.log("Error Selecting : %s ",err );
			}
			res.redirect('/purchase');
		});
	});
};

