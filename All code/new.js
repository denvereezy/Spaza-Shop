var Products = require("./productsSold");
var products = new Products('./Nelisa Sales History.csv');

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

        var catMap = products.groupedItems();
        
        var catStats = {}
        for(var key in categoryMap){
        if(catStats[categoryMap[key]] === undefined){
        catStats[categoryMap[key]] = 0
        }
        catStats[categoryMap[key]] += catMap[key]
        }

      console.log(catStats);
       var mostPopularCategory = products.popularCategory(catStats);


         for(var key in mostPopularCategory){
            console.log(key + " => " + mostPopularCategory[key] );
        }
       console.log("========================================");
      var leastPopularCategory = products.leastPopularCategory(catStats);

         for(var key in leastPopularCategory){
            console.log(key + " => " + leastPopularCategory[key] );
        }

    console.log("========================================");
    var popularProduct = products.mostPopular(catMap);
    for(key in popularProduct){
       console.log(key + "=>" + popularProduct[key]);    
    }

    console.log("========================================");
     var leastPopularProduct = products.leastPopular(catMap);
    for(key in leastPopularProduct){
       console.log(key + "=>" + leastPopularProduct[key]);    
    }
