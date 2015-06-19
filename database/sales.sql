INSERT INTO Sales (Qty,sales_price,sales_date,Name,Product_Id)
SELECT sales_csv.no_sold,sales_csv.sales_price,sales_csv.date, Products.Name, Products.Id
FROM sales_csv 
INNER JOIN Products
ON Products.Name = sales_csv.stock_item;
