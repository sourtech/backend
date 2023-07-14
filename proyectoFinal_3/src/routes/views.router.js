import { passportCall } from "../utils.js";
import viewsControllers from '../controllers/views.controllers.js';
import BaseRouter from "./router.js";

export default class ViewsRouter extends BaseRouter {

    init() {        
        this.get('/', ['PUBLIC'], passportCall('jwt', {strategyType: 'jwt'}), viewsControllers.getHome);
        this.get('/realtimeproducts', ['PUBLIC'], passportCall('jwt', {strategyType: 'jwt'}), viewsControllers.getRealTime);
        this.get('/products', ['LOGIN'], passportCall('jwt', {strategyType: 'jwt'}), viewsControllers.getProducts);
        this.get("/login", ['NO_AUTH'], passportCall('jwt', {strategyType: 'jwt'}), viewsControllers.getLogin);
        this.get("/register", ['NO_AUTH'], passportCall('jwt', {strategyType: 'jwt'}), viewsControllers.getRegister);
        this.get("/chat", ['PUBLIC'], passportCall('jwt', {strategyType: 'jwt'}), viewsControllers.getChat);
        this.get('/profile', ['AUTH'], passportCall('jwt', {strategyType: 'jwt'}), viewsControllers.getProfile);  
        this.get("/cart", ['AUTH'], passportCall('jwt', {strategyType: 'jwt'}), viewsControllers.getCart);    
        //si no existe la pagina lo mando a 404
        this.get("*", ['PUBLIC'], (req, res) => {res.status(404).render('error/404')})
    }
}