//import { Router } from "express";
import ProductManager from '../dao/mongo/managers/productManager.js';
import CartManager from '../dao/mongo/managers/cartManager.js';
import { privacy, authRoles } from "../middlewares/auth.js";
import BaseRouter from "./router.js";
import { passportCall } from "../utils.js";

const manager = new ProductManager();
const cartM = new CartManager();

//const router = Router();

export default class ViewsRouter extends BaseRouter {

    init() {
        this.get('/', ['PUBLIC'], passportCall('jwt', {strategyType: 'jwt'}), async (req, res) => {
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
                    user: req.user, 
                    payload:products, 
                    title:'Home' 
                })
            }
            catch (err) {
                console.log(err);
                //aunque en realidad existe un error prefiero mostrar 404
                res.status(404).render('error/404')
            } 
        })

        this.get('/realtimeproducts', ['PUBLIC'], passportCall('jwt', {strategyType: 'jwt'}), async (req, res) => {
            try {    
                res.render('realTimeProducts', {title:'En vivo', user: req.user})
            }
            catch (err) {
                console.log(err);
                res.status(404).render('error/404' );
            }     
        })

        this.get('/products', ['AUTH'], passportCall('jwt', {strategyType: 'jwt'}), authRoles('usuario'), async(req, res) => {
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
                //console.log(req.user);
                res.render("products", { 
                    status:status, 
                    payload:products,
                    user: req.user,  
                    title:'Home' 
                })
            }
            catch (err) {
               // console.log(err);
                res.status(404).render('error/404')
            } 
        })

        this.get("/chat", ['PUBLIC'], passportCall('jwt', {strategyType: 'jwt'}), async (req, res) => {
            res.render("chat", {title:'Chat', user: req.user});
        });

        this.get("/cart", ['AUTH'], passportCall('jwt', {strategyType: 'jwt'}), async (req, res) => {
            
            //const idCart = '6471261cc14d2ac4b71e7463';
            const idCart = req.user.cart;
            const cart = await cartM.getCartById(idCart);

            let total=0,numeros = [1, 2, 3, 4, 5];
            cart.products.forEach(function(a){total += a.quantity;});
            //console.log(total);
            cart.total = total;
           // const total = carproducts.forEach(prod => console.log(element));

            res.render("cart", { 
                status:'success', 
                payload:cart, 
                user: req.user,
                title:'Cart' 
            })
        });

        this.get("/register", ['NO_AUTH'], passportCall('jwt', {strategyType: 'jwt'}), (req, res) => {
            res.render("register", { title:'Registro' });
        });

        this.get("/login", ['NO_AUTH'], passportCall('jwt', {strategyType: 'jwt'}), (req, res) => {
            res.render("login", { title:'Login' });
        });

        this.get('/profile', ['AUTH'], passportCall('jwt', {strategyType: 'jwt'}), privacy('PRIVATE'), async(req, res) => {
            res.render("profile", { 
                status:'success', 
                user: req.user,  
                title:'Profile' 
            })    
        });

        //si no existe la pagina lo mando a 404
        this.get("*", (req, res) => {
            res.status(404).render('error/404');
        })


    }

}