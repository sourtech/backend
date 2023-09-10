## 📁 DESAFÍO COMPLEMENTARIO

### Consigna

Con base en el proyecto que venimos desarrollando, toca solidificar algunos procesos

### Aspectos a incluir

- Mover la ruta suelta /api/users/premium/:uid a un router específico para usuarios en /api/users/

- Modificar el modelo de User para que cuente con una nueva propiedad “documents” el cual será un array que contenga los objetos con las siguientes propiedades

  - name: String (Nombre del documento).
  - reference: String (link al documento).

- Además, agregar una propiedad al usuario llamada “last_connection”, la cual deberá modificarse cada vez que el usuario realice un proceso de login y logout (OPCIONAL)

- Crear un endpoint en el router de usuarios api/users/:uid/documents con el método POST que permita subir uno o múltiples archivos. Utilizar el middleware de Multer para poder recibir los documentos que se carguen y actualizar en el usuario su status para hacer saber que ya subió algún documento en particular.

- El middleware de multer deberá estar modificado para que pueda guardar en diferentes carpetas los diferentes archivos que se suban.
  - Si se sube una imagen de perfil, deberá guardarlo en una carpeta profiles, en caso de recibir la imagen de un producto, deberá guardarlo en una carpeta products, mientras que ahora al cargar un documento, multer los guardará en una carpeta documents. configurar directamente desde el storage del uploader (modificar el destination).
- Modificar el endpoint /api/users/premium/:uid para que sólo actualice al usuario a premium si ya ha cargado los siguientes documentos:

  - DNI, Comprobante de domicilio, Comprobante de estado de cuenta

- En caso de llamar al endpoint, si no se ha terminado de cargar la documentación, devolver un error indicando que el usuario no ha terminado de procesar su documentación.
  (Sólo si quiere pasar de user a premium, no al revés)
