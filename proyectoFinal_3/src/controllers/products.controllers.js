import { productService } from '../services/repositories/index.js';

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
        console.log(err);
    } 
}

const setProduct = async (req, res) => {
    try {
        const product = req.body;
        const result = await productService.addProduct(product);
        console.log(product);
        if (result.status === 'error') {
            return res.status(400).send({ result });
        }

        return res.status(200).send({ result });
    }
    catch (err) {
        console.log(err);
    }    
}

const updateProduct = async (req, res) => {
    try {
        const pid = req.params.pid;
        const product = req.body;
        const result = await productService.updateProduct(Number(pid), product);

        if (result.status === 'error'){
            return res.status(400).send({ result });
        }
        return res.status(200).send({ result })
    }
    catch (err) {
        console.log(err);
    }
}

const deleteProduct = async (req, res) => {
    try {
        const pid = req.params.pid;
        const result = await productService.deleteProduct(Number(pid));

        if (result.status === 'error'){
            return res.status(400).send({ result });
        }
        return res.status(200).send({ result });
    } catch (err) {
        console.log(err);
    }
}

export default {
    getProducts,
    getProductId,
    setProduct,
    updateProduct,
    deleteProduct
}