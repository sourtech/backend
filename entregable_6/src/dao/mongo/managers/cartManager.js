import cartModel from "../models/carts.js";


export default class CartManager { 

    addCart = (nuevo) => {
        //por el momento no voy a validar nada del produco
        //es solo para poder usar mongo y comprobar que todo funcione
        return cartModel.create(nuevo);
    }; 
    
    getCarts = async (params) => {
        try {
            return await cartModel.find(params).lean();
        } catch (err) {
            console.log(err);
        }
    };       

    getCartById = async (cartId) => {
        try {
            const result = await cartModel.findOne({ _id: cartId }).lean();            
            return result;
        } catch (err) {
            return err
        }

    }     
    /*
    addProductInCart = async (cid, productFromBody) => {

            const cart = await cartModel.findOne({ _id: cid })
            const findProduct = cart.products.some(
                (product) => product._id._id.toString() === productFromBody._id)

            if (findProduct) {
                await cartModel.updateOne(
                    { _id: cid, "products._id": productFromBody._id },
                    { $inc: { "products.$.quantity": productFromBody.quantity } })
                return await cartModel.findOne({ _id: cid })
            }

            await cartModel.updateOne(
                { _id: cid },
                {
                    $push: {
                        products: {
                            _id: productFromBody._id,
                            quantity: productFromBody.quantity
                        }
                    }
                })
            return await cartModel.findOne({ _id: cid })

    }    
*/
    addProduct = async (id, nuevo) => {       
        const cart = await this.getCartById(id)
        const find = cart.products.findIndex(product => product._id._id.toString() === nuevo._id);

        if (find !== -1) {
            cart.products[find].quantity = Number(cart.products[find].quantity) + nuevo.quantity;
        }else{
            cart.products.push(nuevo);
        }
        //actualizo
        const updated = await cartModel.findByIdAndUpdate(id, { $set: cart })
        //devuelvo el carro completo
        return this.getCartById(id);

    };   
    
    removeProduct = async (id, idProduct) => {       
        const cart = await this.getCartById(id);

        const find = cart.products.findIndex(product => product._id._id.toString() === idProduct);

        if (find === -1) {
            return false;
        }
        cart.products.splice(find, 1);
        //actualizo
        const updated = await cartModel.findByIdAndUpdate(id, { $set: cart })
        return true;

    };      

    removeAll = async (id) => {       
        const cart = await this.getCartById(id);
        //borro todos los productos, pero dejo el ID del cart por ahora
        cart.products = [];
        const updated = await cartModel.findByIdAndUpdate(id, { $set: cart })
        return true;

    };        
}