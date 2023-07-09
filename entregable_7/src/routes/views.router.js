import { passportCall } from "../utils.js";
import viewsControllers from '../controllers/views.controllers.js';
import BaseRouter from "./router.js";


//const manager = new ProductManager();
//const cartM = new CartManager();

//const router = Router();

export default class ViewsRouter extends BaseRouter {

    init() {
        
        this.get('/', ['PUBLIC'], passportCall('jwt', {strategyType: 'jwt'}), viewsControllers.getHome);

        this.get('/realtimeproducts', ['PUBLIC'], passportCall('jwt', {strategyType: 'jwt'}), viewsControllers.getRealTime);

        this.get('/products', ['LOGIN'], passportCall('jwt', {strategyType: 'jwt'}), viewsControllers.getProducts);
/*

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
*/

    }

}