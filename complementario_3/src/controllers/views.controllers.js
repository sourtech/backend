import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import { productService, cartService } from "../services/repositories/index.js";

const getHome = async (req, res) => {
    try {  
        const { limit, page, sort, category, stock } = req.query   
            
        const options = {
            page: Number(page) || 1,
            limit: Number(limit) || 12,//por default es 10
            category: category, //el campo a buscar por ahora solo filtro por categoria
            stock: stock || '',//solo si stock llega como 1 filtro a los que tengan stock
            sort: sort || '' //ordena por precio ? sort=1 o sort=-1
        };
        //console.log(options); 
        
        // traigo todos los productos
        const products = await productService.getProducts(options, req, true);
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
        req.logger.error(err);
        //aunque en realidad existe un error prefiero mostrar 404
        res.status(404).render('error/404')
    } 
}

const getRealTime = async (req, res) => {
    try {    
        res.render('realTimeProducts', {title:'En vivo', user: req.user})
    }
    catch (err) {
        req.logger.error(err);
        res.status(404).render('error/404' );
    }
}
const getProducts = async (req, res) => {
    try {  
        const { limit, page, sort, category, stock } = req.query                
        const options = {
            page: Number(page) || 1,
            limit: Number(limit) || 12,//por default es 12
            category: category, //el campo a buscar por ahora solo filtro por categoria
            stock: stock || '',//solo si stock llega como 1 filtro a los que tengan stock
            sort: sort || '' //ordena por precio ? sort=1 o sort=-1
        };
        const products = await productService.getProducts(options, req, true);
        const status = products.docs.length>0 ? 'success' : 'error';
        //console.log(req.user);
        res.render("products", { 
            status:status, 
            payload:products,
            user: req.user,  
            title:'Productos' 
        })
    }
    catch (err) {
        req.logger.error(err);
        res.status(404).render('error/404')
    } 
}

const getLogin = (req, res) => {
    res.render("login", { title:'Login' });    
}

const getForgot = (req, res) => {
    res.render("login_forgot", { title:'Forgot' });    
}

const getRegister = (req, res) => {
    res.render("register", { title:'Registro' });
}

const getRecovery = (req, res) => {
    const {token} = req.query;
    let correct = true;
    //valido el token
    try{
        const valid = jwt.verify(token, config.jwt_secret)
    }catch(error){
        correct = false
    }
    res.render("login_recovery", { title:'Recuperar contraseña', correct });
}

const getChat = (req, res) => {
    req.logger.debug(req.user);
    res.render("chat", {title:'Chat', user: req.user});
}

const getProfile = (req, res) => {
    res.render("profile", { 
        status:'success', 
        user: req.user,  
        title:'Profile' 
    })      
}

const getCart = async (req, res) => {
    //const idCart = '6471261cc14d2ac4b71e7463';
    //console.log('viendo cart');
    const idCart = req.user.cart;
    const cart = await cartService.getCartById(idCart);

    let total=0;
    let price=0;
    cart.products.forEach(function(a){
        total += a.quantity;
        price += a._id.price*a.quantity;
    });
    //console.log(price);
    cart.total = total;
    cart.price = price;
    
    res.render("cart", { 
        status:'success', 
        payload:cart, 
        user: req.user,
        title:'Cart' 
    })    
}

export default {
    getHome,
    getRealTime,
    getProducts,
    getLogin,
    getForgot,
    getRegister,
    getRecovery,
    getChat,
    getProfile,
    getCart
}