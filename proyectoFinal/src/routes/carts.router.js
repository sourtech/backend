import { Router } from "express";

import CartManager from '../components/cartManager.js';
import __dirname from '../utils.js';

const manager = new CartManager(`${__dirname}/data/carts.json`);

const router = Router();

/*
* traigo todos
*/
router.get('/', async(req,res)=>{
    try {
        const result = await manager.getCarts();

        if (result.status === 'error'){
            return res.status(400).send({ result });
        }
        return res.status(200).send({ result });
    } catch (err) {
        console.log(err);
    }
})

/*
* traer carrito por ID
*/
router.get('/:cid', async(req,res)=>{
    try {
        const cid = req.params.cid;
        const result = await manager.getCartById(Number(cid));

        if (result.status === 'error'){
            return res.status(400).send({ result });
        }
        return res.status(200).send(result.message);
    } catch (err) {
        console.log(err);
    }
})

/*
* agregar carrito
*/
router.post('/', async(req,res)=>{
    try {
        const cart = req.body;
        /*falta validar que llegue correctamente*/
        const result = await manager.addCart(cart);

        if (res.status === 'error'){
            return res.status(400).send(result);
        }
        return res.status(200).send(result);
    }
    catch (err) {
        console.log(err);
    }
})

router.post('/:cid/product/:pid', async(req,res)=>{
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;
        //console.log(pid);
        const quantity = req.body; //quantity: debe contener el número de ejemplares de dicho producto. El producto, de momento, se agregará de uno en uno.
        //console.log(quantity.quantity);
        const nuevo = {
            id:Number(pid), 
            quantity:quantity.quantity
        };
        const result = await manager.addProduct(Number(cid), nuevo);
        return res.status(200).send(result);
    }
    catch (err) {
        console.log(err);
    }        
})



export default router;