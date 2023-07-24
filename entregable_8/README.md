## 📁 Mocking y manejo de errores

### Consigna

Se aplicará un módulo de mocking y un manejador de errores a tu servidor actua

### Aspectos a incluir

- Generar un módulo de Mocking para el servidor, con el fin de que, al inicializarse pueda generar y entregar 100 productos con el mismo formato que entregaría una petición de Mongo. Ésto solo debe ocurrir en un endpoint determinado (‘/mockingproducts’) Faker / Únicamente enviar en la respuesta, no insertar en la base
- Además, generar un customizador de errores y crear un diccionario para tus errores más comunes al crear un producto, agregarlo al carrito, etc.

### GET /mockingproducts

**Parameters**

|     Name | Required |  Type  | Description |
| -------: | :------: | :----: | ----------- |
| `limits` | optional | number | default 100 |

**Response**

```
{
    "status": "success",
    "payload": [
        {
            "title": "Mesa",
            "description": "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
            "thumbnail": [],
            "code": "DyQGaaZwJS",
            "stock": 10,
            "status": false,
            "category": "Drama",
            "price": "225.00"
        }
    ]
}

```

### POST /api/products

**body producto completo**

```
{
    "title":"Mandarina",
    "description":"producto frutil22la",
    "price": 78,
    "thumbnail": [],
    "code":"messand22a",
    "stock":2,
    "status": false,
    "category": "Frutas"
}
```

**response**

```
{
    "result": {
        "title": "Mandarina",
        "description": "producto frutil22la",
        "thumbnail": [],
        "code": "messand22a",
        "price": 78,
        "stock": 2,
        "status": false,
        "category": "Frutas",
        "_id": "64beb44c4d0fdb883b9623d6",
        "created_at": "2023-07-24T17:26:36.245Z",
        "updated_at": "2023-07-24T17:26:36.245Z",
        "__v": 0
    }
}
```

**body con ERROR sin title**

```
{
    "description":"producto frutil22la",
    "price": 78,
    "thumbnail": [],
    "code":"messand22a",
    "stock":2,
    "status": false,
    "category": "Frutas"
}
```

**response**

```
{
    "status": "error",
    "error": "Error de creación de producto"
}
```
