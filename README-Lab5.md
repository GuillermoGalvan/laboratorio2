# Laboratorio 5

## Escenario 1

### Ejemplo 1

```sql
SELECT Orders.OrderID, SUM(OrderDetails.Quantity * OrderDetails.UnitPrice) AS TotalPrice
FROM Orders
JOIN OrderDetails ON Orders.OrderID = OrderDetails.OrderID
WHERE OrderDetails.Quantity > 10
GROUP BY Orders.OrderID;
```

### Solucion

```sql
CREATE INDEX idx_Orders_OrderID ON Orders (OrderID);
CREATE INDEX idx_OrderDetails_OrderQuantityPrice ON OrderDetails (OrderID, Quantity);

SELECT Orders.OrderID, SUM(OrderDetails.Quantity * OrderDetails.UnitPrice) AS TotalPrice
FROM Orders
JOIN OrderDetails
    ON Orders.OrderID = OrderDetails.OrderID
WHERE OrderDetails.Quantity > 10
GROUP BY Orders.OrderID;
```

### Ejemplo 2

```sql
SELECT CustomerName FROM Customers WHERE City = 'London' ORDER BY CustomerName;
```

### Solucion

```sql
CREATE INDEX idx_Customers_Location ON Customers (CustomerName, City);
SELECT CustomerName FROM Customers WHERE City = 'London' ORDER BY CustomerName;
```

## Escenario 2

### Ejemplo 1

```nosql
db.posts
  .find({ status: "active" }, { title: 1, likes: 1 })
  .sort({ likes: -1 });

```

### Solucion

```nosql
db.collection.createIndex({ "status" : 1, title: 1, likes: 1 });

db.posts
  .find({ status: "active" }, { title: 1, likes: 1 })
  .sort({ likes: -1 });

```

### Ejemplo 2

```nosql
db.users.aggregate([
  { $match: { status: "active" } },
  { $group: { _id: "$location", totalUsers: { $sum: 1 } } },
]);
```

### Solucion

```nosql
db.collection.createIndex({ "status" : 1 });

db.users.aggregate([
  { $match: { status: "active" } },
  { $group: { _id: "$location", totalUsers: { $sum: 1 } } },
]);

```
