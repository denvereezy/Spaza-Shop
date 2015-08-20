
$(document).ready(function(){
	$("#product_search").keyup(function(){
		var searchValue = $("#product_search").val();
		$.get("/products/search/" + searchValue, function(results){
			$("#products").html(results)
		})
	})

});
	
$(document).ready(function(){
	$("#category_search").keyup(function(){
		var searchValue = $("#categoty_search").val();
		$.get("/categories/search/" + searchValue, function(results){
			$("#categories").html(results)
		})
	})

});
	
