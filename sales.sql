SELECT Qty 
AS AmtSold , Sales_date, sales_price, Name 
from Sales s 
INNER JOIN Products p 
ON s.Product_Id = p.Id 					
ORDER BY Sales_date DESC 
