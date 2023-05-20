import cartModel from "../models/carts.js";


export default class CartManager { 

    addCart = (nuevo) => {
        //por el momento no voy a validar nada del produco
        //es solo para poder usar mongo y comprobar que todo funcione
        return cartModel.create(nuevo);
    }; 
    
    getCarts = (params) => {
        return cartModel.find(params).lean();
    };    

    getCartById = (params) => {
        return cartModel.findOne(params).lean();
    };

    addProduct = (id, nuevo) => {
        //por el momento no voy a validar nada del produco
        //es solo para poder usar mongo y comprobar que todo funcione
console.log(nuevo);
        return cartModel.findByIdAndUpdate(id, { $set: nuevo })
    };   
    
}