import express from 'express';
import ProductManager from './ProductManager/productManager.js';

const manager = new ProductManager('./src/ProductManager/products.json');
const app = express();

app.get('/products', async (req, res) => {

    //limit puede llegar como query string
    const limit = req.query.limit;

    // traigo todos los productos
    const products = await manager.getProducts();

    //si tengo limit y es numerico
    if(limit && limit.match(/^[0-9]+$/) != null){
        //si el limit es superior a la cantidad no importa, muestro los que tengo
        const limitProducts = products.slice(0, limit);
        return res.send(limitProducts);
    }
    // sin limit
    return res.status(200).send({ products });
})

app.get('/products/:pid', async(req, res) => {
    const pid = req.params.pid;

    if(pid && pid.match(/^[0-9]+$/) != null){
        const product = await manager.getProductById(Number(pid));
        if(!product){
            return res.status(400).send({ status: 'error', message: 'No se encuentra el producto con ese ID' });
        }
        return res.send(product)
    }    
    return res.status(400).send({ status: 'error', message: 'Debe enviar el ID' });    
 
})

app.listen(8080, () => {
    try {
        console.log(`Server up!`);
    }
    catch (err) {
        console.log(err);
    }
});