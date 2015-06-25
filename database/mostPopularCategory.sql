SELECT  Categories.Name, sum(Sales.Qty) 
AS TotalQty 
from Sales 
INNER JOIN Products 
ON Sales.Product_id = Products.Id 
INNER JOIN Categories 
ON Products.Category_id = Categories.Id 
GROUP BY Categories.Name 
ORDER BY TotalQty DESC LIMIT 0,1;
