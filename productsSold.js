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
				soldItems : Number(productTotal),
                           
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

//mostpopular[key] key
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
		var linesInFile = fs.readFileSync(filePath, "utf8");
		var productLines = linesInFile.split('\r');
		var totalPrices = {};
		productLines.forEach(function(productLine){

			var splitLines = productLine.split(';');
			//console.log(splitLines);W3Schools
                         if(splitLines.length === 5){
			var currentItem = splitLines[2];
			var numberSold =  splitLines[3];
			var price = splitLines[4];
			//replace things here...
                        //console.log(productLine);
			var replaceR = price.replace("R", " ");
			var replaceComma = replaceR.replace(",", ".");
			//

			if(totalPrices[currentItem] === undefined)
            {
                totalPrices[currentItem] = 0;
            }
            totalPrices[currentItem] += Number(numberSold) * Number(replaceComma);
}
		});

		//console.log(totalPrices);
		return totalPrices;
	};



   this.leastpCat = function(){
        var leastPopularory = {};
        var max = 0;
        for(var cat in catStats) {
            var value = catStats[cat];
            if(value > max) {
              	max = value;
	            leastPopularory = {
	               catStats : cat,
	               AmountSold  : max
	            }
    		}
        }
                //console.log(leastPopularory);
  		return  leastPopularCategory ;
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
        // console.log(mostPopularCategory);
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


 	catStats = {}
        for(var product in prodQtyMap){
        	if(catStats[categoryMap[product]] === undefined){
        		catStats[categoryMap[product]] = 0
        	}
        	catStats[categoryMap[product]] += prodQtyMap[product]
        }
     //console.log(catStats);
      return catStats;
}
//earnings per category
this.earningsPerCategory = function(totalPrices){
	
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


 	earnings = {}
        for(var product in totalPrices){
        	if(earnings[categoryMap[product]] === undefined){
        		earnings[categoryMap[product]] = 0
        	}
        	earnings[categoryMap[product]] += totalPrices[product]
        }
   //  console.log(earnings);
      return earnings;
}
//most profitable product
this.mostProfitableProduct = function(totalPrices){
        var mostProfitable = {};
        var max = 0;
        for(var prop in totalPrices) {
            var value = totalPrices[prop];
            if(value > max) {
              	max = value;
	            mostProfitable = {
	               mostProfitable : prop,
	               AmountSold  : max
	            }
    		}
        }
         console.log(mostProfitable);
  		return mostProfitable ;
    };

//most profitable category
this.mostProfitableCategory = function(earnings){
        var mostProfitableCat = {};
        var max = 0;
        for(var cat in earnings) {
            var value = earnings[cat];
            if(value > max) {
              	max = value;
	            mostProfitableCat = {
	               mostProfitableCat : cat,
	               Amount_earned_R : max
	            }
    		}
        }
        // console.log(mostPopularCategory);
  		return  mostProfitableCat ;
    };
}

	
