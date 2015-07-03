DELETE FROM Categories WHERE NOT EXISTS (SELECT * FROM Products WHERE Products.Category_Id = Categories.Id)
