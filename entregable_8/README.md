## 📁 Mocking y manejo de errores

### Condigan

Se aplicará un módulo de mocking y un manejador de errores a tu servidor actua

### Aspectos a incluir

- Generar un módulo de Mocking para el servidor, con el fin de que, al inicializarse pueda generar y entregar 100 productos con el mismo formato que entregaría una petición de Mongo. Ésto solo debe ocurrir en un endpoint determinado (‘/mockingproducts’) Faker / Únicamente enviar en la respuesta, no insertar en la base

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

-
