var fs = require('fs');

module.exports = function(){

  this.productList = function(filePath){

    var linesInFile = fs.readFileSync(filePath, "utf8");

    var rows = linesInFile.split('\n');
    //console.log(rows.length);

    var listOfProducts = [];
    //listOfProducts.sort(function(a, b){return b-a});
    rows.forEach(function(row){
        var columns = row.split(';');
        var currentItem = columns[2];
        var numberSold = columns[3];

    var salesObj = {
          itemName : columns[2],
          soldItems: Number(columns[3])
          };
          listOfProducts.push(salesObj);
     });
        //console.log(listOfProducts);
        return listOfProducts;
 }

        this.groupItems = function(products) {
          var itemMap = {};

          products.forEach(function(products) {
            var currentItem = products.itemName;
            var numberSold = products.soldItem;

             if(itemMap[currentItem] === undefined){
          itemMap[currentItem] = 0;
        }

        itemMap[currentItem] = itemMap[currentItem] + Number(numberSold);

          });
          return itemMap;

        };

      //Think about creating a list of objects from the csv
         //Create a function that find the most popular product, put it in a module and write a unit test.
      this.mostPopularPdt = function(itemMap){
           var mostPopularProduct = {};
           var max = 0;
           for(var prop in itemMap) {
             var value = itemMap[prop];
             if(value > max) {
              max = value;
              mostPopularProduct = {
               most_popular : prop,
               amt  : max
             }
           }
         }

         //console.log(itemMap);
         return mostPopularProduct;
     };

     this.leastPopularPdt = function(itemMap){
           var leastPopularProduct = {};
           var min = 172;
           for(var prop in itemMap) {
             var value = itemMap[prop];
             if(value < min) {
              min = value;
              leastPopularProduct = {
               least_popular : prop,
               amt  : min
             }
           }
         }
         //console.log(itemMap);
         return leastPopularProduct;
    };


  this.popularCategory = function(productCountMap){
        var mostPopularCategory = {};
        var max = 0;
        for(var cat in productCountMap) {
            var value = productCountMap[cat];
            if(value > max) {
              	max = value;
	            mostPopularCategory = {
	               category : cat,
	               Amount  : max
	            }
    		}
        }
         
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
	               category : cat,
	               Amount  : min
	            }
    		}
        }
       
  		return  leastPopularCategory ;
    };
};
