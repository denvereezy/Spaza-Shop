var fs = require('fs'); 

module.exports = function(filePath){
           
           this.productNames = function(callback) 
           {
                var filesInFolder = fs.readFileSync(filePath, "utf8");
                var rows = filesInFolder.split('\r');
                console.log("===> " + rows.length);
                
                var listOfProducts = [];
                var productMap = {};

                rows.forEach(function(row){ 
                		var productName = row.split(',')[2];//index of product after being split row by row
                		if( productMap[productName] === undefined ){//check if the product is there
                		    listOfProducts.push(productName);
                		    productMap[productName] = 0;//starting point
                		}
                });
                return listOfProducts;
            };
            //list of products

           
           this.productsSold = function(callback)
            {
                var filesInFolder = fs.readFileSync(filePath, "utf8"); 
                var rowsInFile = filesInFolder.split('\r'); 
                console.log(rowsInFile.length);
                var productQuantity = []; 
                var quantityMap = {};//creating a new map
                rowsInFile.forEach(function(row){
                  var fields = row.split(',');
                  var currentProduct = fields[1];//index and also using "curretnproduct" as key
                  var productQty = fields[3];//index
                  console.log( " files : " + JSON.stringify(fields));//converts Js value to a JSON string for us to see it 
                  if( quantityMap[currentProduct] === undefined)//check if we have qty
                    {
                      quantityMap[currentProduct] = 0;//starting piont
                    }
                    quantityMap[currentProduct] += Number(productQty);//getting overall qty of each product
                });
                
                console.log( "Total-----> " + JSON.stringify(quantityMap));
                callback(null, quantityMap);

            };
};
