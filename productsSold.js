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

//earnings per category
   this.earningsPerCategory = function(productCountMap, totalPrices){
       var earnings ={};
       for(var key in productCountMap){
       console.log(productCountMap[key]);
       }
       for(var key in totalPrices){

     var total = productCountMap[key] * totalPrices[key];
      earnings={
             key :key,
             total : total
}
   //console.log(earnings);
   return earnings;
}

};

this.totalEarningsPerCategory = function(earnings){

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
        for(var product in earnings){
        	if(catStats[categoryMap[product]] === undefined){
        		catStats[categoryMap[product]] = 0
        	}
        	catStats[categoryMap[product]] += earnings[product]
        }
     console.log(catStats);
      return catStats;


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


  	this.CategoryEarnings = function(){
	   

       if(catStats[categoryMap[product]] === undefined){
        		catStats[categoryMap[product]] = 0
        	}
}


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

}

	
