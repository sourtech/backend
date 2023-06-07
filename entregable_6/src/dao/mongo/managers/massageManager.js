import msnModel from "../models/messages.js";


export default class MessageManager { 

    /*
    addCart = (nuevo) => {
        //por el momento no voy a validar nada del produco
        //es solo para poder usar mongo y comprobar que todo funcione
        return cartModel.create(nuevo);
    };
    */ 
    
    getMessages = (params) => {
        return msnModel.find(params).lean();
    };   
    
    sendMessage = (nuevo) => {
        return msnModel.create(nuevo);
    };

    /*
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
    */
}