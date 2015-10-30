    $(document).ready(function(){
        $("#product_search").keyup(function(){
            var searchValue = $("#product_search").val();
            $.get("/products/search/" + searchValue, function(results){
                $("#products").html(results)
            })
        });

        $("#sales_search").keyup(function(){
            var searchValue = $("#sales_search").val();
            $.get("/sales/search/" + searchValue, function(results){
                $("#sales").html(results)
            })
        });
    
        $("#allsales_search").keyup(function(){
            var searchValue = $("#allsales_search").val();
            $.get("/allsales/search/" + searchValue, function(results){
                $("#allsales").html(results)
            })
        });
   
        $("#earnings_search").keyup(function(){
            var searchValue = $("#earnings_search").val();
            $.get("/product_earnings/search/" + searchValue, function(results){
                $("#product_earnings").html(results)
            })
        });
       
        $("#category_search").keyup(function(){
            var searchValue = $("#category_search").val();
            $.get("/categories/search/" + searchValue, function(results){
                $("#categories").html(results)
            })
        });

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
        
        $("#supplier_search").keyup(function(){
            var searchValue = $("#supplier_search").val();
            $.get("/suppliers/search/" + searchValue, function(results){
                $("#suppliers").html(results)
            })
        });
        
        $("#purchases").keyup(function(){
            var searchValue = $("#purchases").val();
            $.get("/purchases/search/" + searchValue, function(results){
                $("#all_purchases").html(results)
            })
        });
    
        $("#menu-toggle").click(function(e) {
            e.preventDefault();
            $("#wrapper").toggleClass("toggled");
        });

        $('.carousel').carousel({
            interval: 7000
        })

        $('body').prepend('<a href="#" class="back-to-top">Back to Top</a>');

        var amountScrolled = 300;

        $(window).scroll(function() {
            if ($(window).scrollTop() > amountScrolled) {
                $('a.back-to-top').fadeIn('slow');
            } else {
                $('a.back-to-top').fadeOut('slow');
            }
        });

        $('a.back-to-top').click(function() {
            $('html,body').animate({
                scrollTop: 0
            }, 700);
            return false;
        });
    
    });

