var assert = require("assert");

describe("Find most popular product in file", function(){
         

    it('should return the most popular product', function(){
 console.log("=================================");
         var Products = require("./productsSold");
         var products = new Products();

        var list = { 
                     'Mixed Sweets 5s': 172,
                     'Coke 500ml': 159,
                     'Milk': 142,
                     'Bread': 130,
                     'Imasi': 125,
                     'Bananas - loose': 114,
                     'Apples': 114,
                     'Top Class Soy Mince': 98,
                     'Chakalaka Can': 94,
                     'Fanta 500ml': 94,
                     'Gold Dish Vegetable Curry  Can': 86,
                     'Cream Soda 500ml': 75,
                     'Soap Bar': 50,
                     'Iwisa Pap 5kg': 47,
                     'Shampoo 1l': 26,
                     'Heart Chocolates': 20,
                     'Rose (plastic)': 14,
                     'Valentine Cards': 14
                     };

        
        var productsResults = products.mostPopularPdt(list);
            console.log(list);
            console.log("=================================");
            console.log(productsResults);
            assert.equal('Mixed Sweets 5s', productsResults["most_popular"]);
            assert.equal(172, productsResults["amt"]);
            
    });
    
   it('should return the least popular product', function(){
        console.log("======================================");
         var Products = require("./productsSold");
         var products = new Products();
         var lists = { 
                     'Mixed Sweets 5s': 172,
                     'Coke 500ml': 159,
                     'Milk': 142,
                     'Bread': 130,
                     'Imasi': 125,
                     'Bananas - loose': 114,
                     'Apples': 114,
                     'Top Class Soy Mince': 98,
                     'Chakalaka Can': 94,
                     'Fanta 500ml': 94,
                     'Gold Dish Vegetable Curry  Can': 86,
                     'Cream Soda 500ml': 75,
                     'Soap Bar': 50,
                     'Iwisa Pap 5kg': 47,
                     'Shampoo 1l': 26,
                     'Heart Chocolates': 20,
                     'Rose (plastic)': 14,
                     'Valentine Cards': 14  
                    };

      
        var productsResults = products.leastPopularPdt(lists);
              console.log(lists);
              console.log("========================================");
              console.log(productsResults)
              assert.equal('Rose (plastic)', productsResults["least_popular"]);
              assert.equal(14, productsResults["amt"]);
 
    });


   it('should return most popular category', function(){
        console.log("==============================================");
        var Products = require("./productsSold");
        var products = new Products();
        var categoryMap = {
        'beverages': 328,
        'Dairy': 297,
        'Canned Food': 278,
        'Fruit': 228,
        'Candy': 192,
        'Bakery': 130,
        'Toiletries': 76,
        'Starch Food': 47,
        'Extras': 28,
        
        };

        var mostPopularCategory = products.popularCategory(categoryMap);
        
        console.log("Categories with total number of sales:");
        console.log("===============================================");

        for(var key in categoryMap){
            console.log(key + " => " + categoryMap[key] );
        }

        console.log("Most popular category and its sales amount:");
        console.log("===============================================");

        for(var key in mostPopularCategory){
            console.log(key + " => " + mostPopularCategory[key] );
        }
});
    it('should return least popular category', function(){
        console.log("===============================================");
        var Products = require("./productsSold");
        var products = new Products();
        var categoryMap = {
        'beverages': 328,
        'Dairy': 297,
        'Canned Food': 278,
        'Fruit': 228,
        'Candy': 192,
        'Bakery': 130,
        'Toiletries': 76,
        'Starch Food': 47,
        'Extras': 28,
        
        };

        var leastPopularCategory = products.leastPopularCategory(categoryMap);
        
        console.log("Categories with total number of sales:");
        console.log("===============================================");

        for(var key in categoryMap){
            console.log(key + " => " + categoryMap[key] );
        }

        console.log("Least popular category and its sales amount:");
        console.log("===============================================");

        for(var key in leastPopularCategory){
            console.log(key + " => " + leastPopularCategory[key] );
        }
});

   it('should return the earnings per category', function(){
   console.log("================================================");
});
});


