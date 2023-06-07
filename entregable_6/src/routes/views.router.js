import { Router } from "express";
import ProductManager from '../dao/mongo/managers/productManager.js';
import CartManager from '../dao/mongo/managers/cartManager.js';
import { privacy } from "../middlewares/auth.js";
import __dirname from '../utils.js';

const manager = new ProductManager();
const cartM = new CartManager();

const router = Router();

router.get('/', async (req, res) => {
    try {  
        const { limit, page, sort, category, stock } = req.query   
             
        const options = {
            page: Number(page) || 1,
            limit: Number(limit) || 10,//por default es 10
            category: category, //el campo a buscar por ahora solo filtro por categoria
            stock: stock || '',//solo si stock llega como 1 filtro a los que tengan stock
            sort: sort || '' //ordena por precio ? sort=1 o sort=-1
        };
        //console.log(options); 
        
        // traigo todos los productos
        const products = await manager.getProducts(options, req, true);
        //console.log(products);
        //console.log(products.docs);
        const status = products.docs.length>0 ? 'success' : 'error';
        res.render("index", { 
            status:status,
            user: req.session.user, 
            payload:products, 
            title:'Home' 
        })
    }
    catch (err) {
        //console.log(err);
        //aunque en realidad existe un error prefiero mostrar 404
        res.status(404).render('error/404')
    } 
})

router.get('/realtimeproducts', (req, res) => {    
    try {    
        res.render('realTimeProducts', {title:'En vivo', user: req.session.user})
    }
    catch (err) {
        console.log(err);
        res.status(404).render('error/404' );
    }     
})
router.get('/products', async (req, res) => {
    try {  
        const { limit, page, sort, category, stock } = req.query                
        const options = {
            page: Number(page) || 1,
            limit: Number(limit) || 10,//por default es 10
            category: category, //el campo a buscar por ahora solo filtro por categoria
            stock: stock || '',//solo si stock llega como 1 filtro a los que tengan stock
            sort: sort || '' //ordena por precio ? sort=1 o sort=-1
        };
        const products = await manager.getProducts(options, req, true);
        const status = products.docs.length>0 ? 'success' : 'error';
        res.render("products", { 
            status:status, 
            payload:products,
            user: req.session.user,  
            title:'Home' 
        })
    }
    catch (err) {
        res.status(404).render('error/404')
    } 
})

router.get("/chat", async (req, res) => {
    res.render("chat", {title:'Chat', user: req.session.user});
});

router.get("/cart", async (req, res) => {
    
    const idCart = '6471261cc14d2ac4b71e7463';
    const cart = await cartM.getCartById(idCart);

    res.render("cart", { 
        status:'success', 
        payload:cart, 
        title:'Cart' 
    })
});

router.get("/register", privacy('NO_AUTHENTICATED'), async (req, res) => {
    res.render("register", { title:'Registro' });
});

router.get("/login", privacy('NO_AUTHENTICATED'), async (req, res) => {
    res.render("login", { title:'Login' });
});

router.get("/profile", privacy('PRIVATE'), async (req, res) => {
    res.render("profile", { 
        status:'success', 
        user: req.session.user,  
        title:'Profile' 
    })    
});

//si no existe la pagina lo mando a 404
router.get("*", (req, res) => {
    res.status(404).render('error/404');
})

export default router;