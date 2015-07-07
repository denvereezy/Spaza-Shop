SELECT SUM(Qty) 
AS TotalQty , Product_Id, Name 
from Sales s 
INNER JOIN Products p 
ON s.Product_Id = p.Id 					
GROUP BY Name
