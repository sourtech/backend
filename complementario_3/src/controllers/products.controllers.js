import { productService } from '../services/repositories/index.js';
//control de errores
import ErrorService from "../services/errors/CustomError.js";
import { productErrorIncomplete } from "../services/errors/productErrors.js";
import EErrors from "../services/errors/EErrors.js";

const getProducts = async (req, res) => {
    //limit puede llegar como query string
    const limit = req.query.limit;

    // traigo todos los productos
    const products = await productService.getProducts();

    //si tengo limit y es numerico
    if(limit && limit.match(/^[0-9]+$/) != null){
        //si el limit es superior a la cantidad no importa, muestro los que tengo
        //NUEVO
        //en la sigiente etapa el limit lo tengo que hacer directamente en MONGO no traer todo y luego limitar
        const limitProducts = products.docs.slice(0, limit);
        return res.send(limitProducts);
    }
    // sin limit
    return res.status(200).send({ products });
}

const getProductId = async (req, res) => {
    try {    
        const pid = req.params.pid;

        const product = await productService.getProductById({ _id: pid });
        if(!product){
            return res.status(400).send({ status: 'error', message: 'No se encuentra el producto con ese ID' });
        }
        return res.send(product)
    }
    catch (err) {
        req.logger.error(err);
    } 
}

const setProduct = async (req, res) => {
    const product = req.body;
    //todos los campos son obligatorios, menos estatus default false
    if (!product.title||!product.description||!product.thumbnail||!product.code||!product.price||!product.stock||!product.category) {
        //genero el error PARA EL SERVIDOR            
        ErrorService.createError({
            name:"Error de creación de producto",
            cause: productErrorIncomplete(product),//uso mi diccionario
            message: 'Error intentando insertar un nuevo producto',
            code: EErrors.INCOMPLETE_VALUES,
            status:400
        })
        //va a salir por el try catch del applyCallbacks router.js
    }
    //Nueva funcion si es admin o un usuario premium
    product.owner = req.user.role == "admin" ? "admin" : req.user.email;
    const result = await productService.addProduct(product);
    if (result.status === 'error'){
        return res.sendErrorWithPayload({ result });
    }
    return res.sendSuccessWithPayload({ result })
}

const updateProduct = async (req, res) => {
    try {
        const pid = req.params.pid;
        const product = req.body;

        //compruebo que id este bien formo
        if (!pid.match(/^[0-9a-fA-F]{24}$/)) {
            return res.sendBadRequest('El id no es correcto');
        }
        //Traigo el producto de la base
        const productNow = await productService.getProductById({ _id: pid });
        if(!productNow){
            return res.sendBadRequest('El producto no existe');
        }
        //si el usuario es premium tengo que validar que el producto sea de el
        if(req.user.role=='premium' && productNow.owner!=req.user.email){
            return res.sendErrorWithPayload('No tienes permisos para borrar el producto')        
        }
        const result = await productService.updateProduct(pid, product);
        if (result.status === 'error'){
            return res.sendErrorWithPayload({ result });
        }
        return res.sendSuccessWithPayload({ result })
    }
    catch (err) {
        req.logger.error(err);
    }
}

const deleteProduct = async (req, res) => {
    try {
        const pid = req.params.pid;

        //compruebo que id este bien formo
        if (!pid.match(/^[0-9a-fA-F]{24}$/)) {
            return res.sendBadRequest('El id no es correcto');
        }
        //Traigo el producto de la base
        const productNow = await productService.getProductById({ _id: pid });
        if(!productNow){
            return res.sendBadRequest('El producto no existe');
        }
        //si el usuario es premium tengo que validar que el producto sea de el
        if(req.user.role=='premium' && productNow.owner!=req.user.email){
            return res.sendErrorWithPayload('No tienes permisos para borrar el producto')        
        }
        const result = await productService.deleteProduct(pid);
        if (result.status === 'error'){
            return res.sendErrorWithPayload({ result });
        }
        return res.sendSuccessWithPayload('Producto eliminado')
    } catch (err) {
        req.logger.error(err);
    }
}

export default {
    getProducts,
    getProductId,
    setProduct,
    updateProduct,
    deleteProduct
}