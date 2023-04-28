import { Router } from "express";
import ProductManager from '../components/productManager.js';
import __dirname from '../utils.js';

const manager = new ProductManager(`${__dirname}/data/products.json`);

const router = Router();

router.get('/', async (req, res) => {
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

router.get('/:pid', async(req, res) => {
    try {    
        const pid = req.params.pid;

        if(pid && pid.match(/^[0-9]+$/) != null){
            const product = await manager.getProductById(Number(pid));
            if(!product){
                return res.status(400).send({ status: 'error', message: 'No se encuentra el producto con ese ID' });
            }
            return res.send(product)
        }    
        return res.status(400).send({ status: 'error', message: 'Debe enviar el ID' });  
    }
    catch (err) {
        console.log(err);
    } 
})

router.post('/', async(req, res) => {
    try {
        const product = req.body;
        const result = await manager.addProduct(product);
        if (result.status === 'error') {
            return res.status(400).send({ result });
        }

        return res.status(200).send({ result });
    }
    catch (err) {
        console.log(err);
    }
})

router.put('/:pid', async(req, res) => {
    try {
        const pid = req.params.pid;
        const product = req.body;
        const result = await manager.updateProduct(Number(pid), product);

        if (result.status === 'error'){
            return res.status(400).send({ result });
        }
        return res.status(200).send({ result })
    }
    catch (err) {
        console.log(err);
    }
})

router.delete('/:pid', async(req,res)=>{
    try {
        const pid = req.params.pid;
        const result = await manager.deleteProduct(Number(pid));

        if (result.status === 'error'){
            return res.status(400).send({ result });
        }
        return res.status(200).send({ result });
    } catch (err) {
        console.log(err);
    }
})

export default router;