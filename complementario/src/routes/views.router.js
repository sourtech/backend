import { Router } from "express";
import ProductManager from '../dao/mongo/managers/productManager.js';
import __dirname from '../utils.js';

const manager = new ProductManager();

const router = Router();

router.get('/', async (req, res) => {
    try {    
        // traigo todos los productos
        const products = await manager.getProducts();
        res.render("index", { products, title:'Home' })
    }
    catch (err) {
        console.log(err);
        //aunque en realidad existe un error prefiero mostrar 404
        res.status(404).render('error/404')
    } 
})

router.get('/realtimeproducts', (req, res) => {    
    try {    
        res.render('realTimeProducts', {title:'En vivo'})
    }
    catch (err) {
        console.log(err);
        res.status(404).render('error/404');
    }     
})

router.get("/chat", async (req, res) => {
    res.render("chat", {title:'Chat'});
});

export default router;