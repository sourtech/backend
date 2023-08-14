## 📁 Desafio complementario

### Consigna

Con base en el proyecto que venimos desarrollando, toca solidificar algunos procesos

### Aspectos a incluir

- Realizar un sistema de recuperación de contraseña.

- Establecer un nuevo rol para el schema del usuario llamado “premium” el cual estará habilitado también para crear productos
- Modificar el schema de producto para contar con un campo “owner”, el cual haga referencia a la persona que creó el producto
  - Si un producto se crea sin owner, se debe colocar por defecto “admin”.
  - El campo owner deberá guardar sólo el correo electrónico (o \_id, lo dejamos a tu conveniencia) del usuario que lo haya creado (Sólo podrá recibir usuarios premium)
- Modificar los permisos de modificación y eliminación de productos para que:

  - Un usuario premium sólo pueda borrar los productos que le pertenecen.
  - El admin pueda borrar cualquier producto, aún si es de un owner.

- Además, modificar la lógica de carrito para que un usuario premium NO pueda agregar a su carrito un producto que le pertenece
- Implementar una nueva ruta en el router de api/users, la cual será /api/users/premium/:uid la cual permitirá cambiar el rol de un usuario, de “user” a “premium” y viceversa.
