# Lab 10

## JavaScript Snippet

```javascript
// Inefficient loop handling and excessive DOM manipulation
function updateList(items) {
  let list = document.getElementById("itemList");
  list.innerHTML = "";
  for (let i = 0; i < items.length; i++) {
    let listItem = document.createElement("li");
    listItem.innerHTML = items[i];
    list.appendChild(listItem);
  }
}
```

### Solucion

Se crea un fragmento que nos ayude a colocar todos los elementos que se desean crear dentro de este nuevo elemento y despues agregar este elemento al DOM para evitar el uso excessivo del mismo.

```javascript
function updateList(items) {
  let fragment = document.createDocumentFragment();

  for (let i = 0; i < items.length; i++) {
    let listItem = document.createElement("li");
    listItem.innerHTML = items[i];
    fragment.appendChild(listItem);
  }

  document.getElementById("list").appendChild(fragment);
}
```

## Java Snippet:

```java
// Redundant database queries
public class ProductLoader {
    public List<Product> loadProducts() {
        List<Product> products = new ArrayList<>();
        for (int id = 1; id <= 100; id++) {
            products.add(database.getProductById(id));
        }
        return products;
    }
}
```

### Solucion

Se podria atacar de varias maneras pero creo que la mas efectiva es hacer una sola consulta con una funcion que en lugar de ir uno por uno que vaya a la base de datos con un between en el where.

```java
public class ProductLoader {
    public List<Product> loadProducts() {
        List<Product> products = new ArrayList<>();

        productos.addAll(database.getProductByIdRange(0, 101));

        return products;
    }
}
```

## C# Snippet:

```csharp
// Unnecessary computations in data processing
public List<int> ProcessData(List<int> data) {
    List<int> result = new List<int>();
    foreach (var d in data) {
        if (d % 2 == 0) {
            result.Add(d * 2);
        } else {
            result.Add(d * 3);
        }
    }
    return result;
}

```

Se puede mejorar de varias maneras, pero la forma en la que yo lo haria seria con un switch y utilizando un tipo de colleccion diferente para el rendimiento optimo.

```csharp
public List<int> ProcessData(List<int> data)
{
    var result = new Queue<int>();

    foreach (var number in data)
    {
        switch (number % 2)
        {
            case 0:
                result.Enqueue(number * 2);
                break;
            default:
                result.Enqueue(number * 3);
                break;
        }
    }

    return [.. result];
}

```

Todos estos ecensario se tendrian que realizar pruebas de performance y ver que realmente los cambios ayudaron para obtimicar los tiempos y evitar el uso de recursos computacionales para su trabajo.
