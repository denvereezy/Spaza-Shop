SELECT Categories.Name as cat_name,Products.Name
from Categories
INNER JOIN Products where Products.category_Id=Categories.Id;

