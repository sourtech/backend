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

    addProduct = async (id, nuevo) => {
        
        const cart = await this.getCartById(id)
        const find = cart.products.findIndex(product => product.id === nuevo.id);

        if (find !== -1) {
            cart.products[find].quantity = Number(cart.products[find].quantity) + nuevo.quantity;
        }else{
            cart.products.push(nuevo);
        }
        //actualizo
        const updated = await cartModel.findByIdAndUpdate(id, { $set: cart })
        return updated;
    };   
    
}