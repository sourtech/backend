//import { Router } from "express";
import CartManager from '../dao/mongo/managers/cartManager.js';
import BaseRouter from "./router.js";
import { passportCall } from "../utils.js";
const manager = new CartManager();

//const router = Router();
export default class CartsRouter extends BaseRouter {
    init() {
        /*
        * traigo todos
        */
        this.get('/', async(req,res)=>{
            try {
                const result = await manager.getCarts();
                //console.log(result);
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
        this.get('/:cid', async(req,res)=>{
            try {
                const cid = req.params.cid;
                const result = await manager.getCartById(cid);
                return res.status(200).send(result);
            } catch (err) {
                console.log(err);
            }
        })

        /*
        * agregar carrito
        */
        this.post('/', async(req,res)=>{
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

        this.post('/:cid/product/:pid', async(req,res)=>{
            try {
                const cid = req.params.cid;
                const pid = req.params.pid;
                //console.log(pid);
                const quantity = req.body; //quantity: debe contener el número de ejemplares de dicho producto. El producto, de momento, se agregará de uno en uno.

                const nuevo = {
                    _id:pid, 
                    quantity:quantity.quantity
                };
                const result = await manager.addProduct({ _id: cid }, nuevo);
                return res.status(200).send(result);
            }
            catch (err) {
                console.log(err);
            }        
        })

        /*
        * Agregar al carrito 1 producto
        */
        this.get('/add/:id', ['AUTH'], passportCall('jwt', {strategyType: 'jwt'}), async (req, res) => {
            const productId = req.params.id;

            //EL ID del carrito ahora lo tiene el usuario
            const cid = req.user.cart; 
            const nuevo = {
                _id:productId, 
                quantity:1
            };
            const result = await manager.addProduct({ _id: cid }, nuevo);
            res.redirect('/cart');

        });

        /*
        * Borrar todos los productos del carrito
        */
        this.get('/remove/all', ['AUTH'], passportCall('jwt', {strategyType: 'jwt'}), async (req, res) => {
            //EL ID por el momento es siempre este
            //const cid = '6471261cc14d2ac4b71e7463'; 
            //EL ID del carrito ahora lo tiene el usuario
            const cid = req.user.cart;     
            const result = await manager.removeAll({ _id: cid });
            if(result){
            return res.redirect('/cart');
            }
            //si no existe el producto lo mando a home
            //a futuro pondre un aviso
            res.redirect('/');
            
        });

        /*
        * Borrar del carrito un producto
        */
        this.get('/remove/:id', ['AUTH'], passportCall('jwt', {strategyType: 'jwt'}), async (req, res) => {
            const productId = req.params.id;

            //EL ID por el momento es siempre este
            //const cid = '6471261cc14d2ac4b71e7463'; 
            //EL ID del carrito ahora lo tiene el usuario
            const cid = req.user.cart;             

            const result = await manager.removeProduct({ _id: cid }, productId);
            if(result){
                return res.redirect('/cart');
            }
            //si no existe el producto lo mando a home
            //a futuro pondre un aviso
            res.redirect('/');
            
        });        
    }
}

