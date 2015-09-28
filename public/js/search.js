    //=======PRODUCTS===========================================
    //all of products search
    $(document).ready(function(){
        $("#product_search").keyup(function(){
            var searchValue = $("#product_search").val();
            $.get("/products/search/" + searchValue, function(results){
                $("#products").html(results)
            })
        })

    
    //grouped product sales
   
        $("#sales_search").keyup(function(){
            var searchValue = $("#sales_search").val();
            $.get("/sales/search/" + searchValue, function(results){
                $("#sales").html(results)
            })
        })

 

    //ovarall product sales
    
        $("#allsales_search").keyup(function(){
            var searchValue = $("#allsales_search").val();
            $.get("/allsales/search/" + searchValue, function(results){
                $("#allsales").html(results)
            })
      

    });

    //earnings per product
   
        $("#earnings_search").keyup(function(){
            var searchValue = $("#earnings_search").val();
            $.get("/product_earnings/search/" + searchValue, function(results){
                $("#product_earnings").html(results)
            })
        

    });
    //===============================================================================

    //all of categories search	
   
        $("#category_search").keyup(function(){
            var searchValue = $("#category_search").val();
            $.get("/categories/search/" + searchValue, function(results){
                $("#categories").html(results)
            })
        

    });

//category sales

        $("#category_sales_search").keyup(function(){
            var searchValue = $("#category_sales_search").val();
            $.get("/category_sales/search/" + searchValue, function(results){
                $("#catsales").html(results)
            })
        

    });

 
        $("#category_earnings_search").keyup(function(){
            var searchValue = $("#category_earnings_search").val();
            $.get("/category_earnings/search/" + searchValue, function(results){
                $("#category_earnings").html(results)
            })
       

    });
//===================================================================================
    //suppliers search
    
        $("#supplier_search").keyup(function(){
            var searchValue = $("#supplier_search").val();
            $.get("/suppliers/search/" + searchValue, function(results){
                $("#suppliers").html(results)
            })
      

    });

//purchases search
    
        $("#purchases").keyup(function(){
            var searchValue = $("#purchases").val();
            $.get("/purchases/search/" + searchValue, function(results){
                $("#all_purchases").html(results)
            })
        

    });
});