var fs = require('fs');

module.exports = function(filePath){
	this.productNames = function(callback) {
		var linesInFile = fs.readFileSync(filePath, "utf8"); 
		var lines= linesInFile.split('\r');
		var totalProducts =[];

		lines.forEach(function(storedLines){

			var product = storedLines.split(';');
			
			var currentItem = product[2];
			var productTotal = product[3];

			var productMap = {
				itemName : currentItem,
				soldItems : Number(productTotal)
			};
			totalProducts.push(productMap);
		  });

		callback(null, totalProducts);
	};


	this.groupedItems = function(){
		var linesInFile = 	fs.readFileSync(filePath, "utf8");
		var productLines = linesInFile.split('\r');
		var productCountMap = {};
		productLines.forEach(function(productLine){

			var splitLines = productLine.split(';');
			//console.log(splitLines);

			var currentItem = splitLines[2];
			var numberSold =  splitLines[3];

			if(productCountMap[currentItem] === undefined)
            {
                productCountMap[currentItem] = 0;
            }
            productCountMap[currentItem] += Number(numberSold);
		});

		return productCountMap;
	}
	
	this.mostPopular = function(productCountMap){
        var mostPopularProduct = {};
        var max = 0;
        for(var prop in productCountMap) {
            var value = productCountMap[prop];
            if(value > max) {
              	max = value;
	            mostPopularProduct = {
	               mostPopularProduct : prop,
	               AmountSold  : max
	            }
    		}
        }
         //console.log(itemMap);
  		return mostPopularProduct ;
    };
     this.leastPopular = function(productCountMap){
	           var leastPopularProduct = {};
	           var min = 172;
	           for(var prop in productCountMap) {
	             var value = productCountMap[prop];
	             if(value < min) {
	              min = value;
	              leastPopularProduct = {
	               leastPopularProduct : prop,
	               AmountSold  : min
	             }
	           }
	         }
         //console.log(itemMap);
         return leastPopularProduct;
        }


    this.earningsPerProduct = function(){
		var linesInFile = 	fs.readFileSync(filePath, "utf8");
		var productLines = linesInFile.split('\r');
		var totalPrices = {};
		productLines.forEach(function(productLine){

			var splitLines = productLine.split(';');
			//console.log(splitLines);

			var currentItem = splitLines[2];
			var numberSold =  splitLines[3];
			var price 		=	splitLines[4];
			if(totalPrices[currentItem] === undefined)
            {
                totalPrices[currentItem] = 0;
            }
            totalPrices[currentItem] += Number(numberSold*price);
		});

		return totalPrices;
	};


    this.popularCategory = function(productCountMap){
        var mostPopularCategory = {};
        var max = 0;
        for(var cat in productCountMap) {
            var value = productCountMap[cat];
            if(value > max) {
              	max = value;
	            mostPopularCategory = {
	               MostPopularCategory : cat,
	               AmountSold : max
	            }
    		}
        }
         //console.log(itemMap);
  		return  mostPopularCategory ;
    };
 this.leastPopularCategory = function(productCountMap){
        var leastPopularCategory = {};
        var min = 328;
        for(var cat in productCountMap) {
            var value = productCountMap[cat];
            if(value < min) {
              	min = value;
	            leastPopularCategory = {
	               leastPopularCategory : cat,
	               AmountSold  : min
	            }
    		}
        }
       
  		return  leastPopularCategory ;
    };

this.categoryQtySold = function(prodQtyMap){
	
	var categoryMap = {
			'Milk 1l':'Dairy',
			'Imasi':'Dairy',
			'Bread': 'Bakery',
			'Chakalaka Can': 'CanFood',
			'Gold Dish Vegetable Curry Can': 'CanFood',
			'Fanta 500ml':'Beverages',
			'Coke 500ml': 'Beverages',
			'Cream Soda 500ml':'Beverages',
			'Iwisa Pap 5kg': 'Starch',
			'Top Class Soy Mince':'Meat',
			'Shampoo 1 litre':'Toiletries',
			'Soap Bar':'Toiletries',
			'Bananas - loose':'Fruits',
			'Apples - loose':'Fruits',
			'Mixed Sweets 5s':'Candy',
			'Heart Chocolates': 'Candy',
			'Rose (plastic)': 'Extras',
			'Valentine Cards': 'Extras'
        };


 	var catStats = {}
        for(var product in prodQtyMap){
        	if(catStats[categoryMap[product]] === undefined){
        		catStats[categoryMap[product]] = 0
        	}
        	catStats[categoryMap[product]] += prodQtyMap[product]
        }
      // console.log(catStats);
      return catStats;
}

}

	
