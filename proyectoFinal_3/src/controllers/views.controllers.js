import { productService, cartService } from "../services/repositories/index.js";

const getHome = async (req, res) => {
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
        console.log(err);
        //aunque en realidad existe un error prefiero mostrar 404
        res.status(404).render('error/404')
    } 
}

const getRealTime = async (req, res) => {
    try {    
        res.render('realTimeProducts', {title:'En vivo', user: req.user})
    }
    catch (err) {
        console.log(err);
        res.status(404).render('error/404' );
    }
}
const getProducts = async (req, res) => {
    try {  
        const { limit, page, sort, category, stock } = req.query                
        const options = {
            page: Number(page) || 1,
            limit: Number(limit) || 10,//por default es 10
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
            title:'Home' 
        })
    }
    catch (err) {
       // console.log(err);
        res.status(404).render('error/404')
    } 
}

const getLogin = (req, res) => {
    res.render("login", { title:'Login' });    
}

const getRegister = (req, res) => {
    res.render("register", { title:'Registro' });
}

const getChat = (req, res) => {
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
}

export default {
    getHome,
    getRealTime,
    getProducts,
    getLogin,
    getRegister,
    getChat,
    getProfile,
    getCart
}