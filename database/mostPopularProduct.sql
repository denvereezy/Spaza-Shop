SELECT  SUM(Qty) AS TotalQty, Product_Id, Name
FROM Sales s
INNER JOIN Products p
ON s.Product_Id = p.Id
GROUP BY Name
ORDER BY SUM(Qty) DESC
LIMIT 0,1;
