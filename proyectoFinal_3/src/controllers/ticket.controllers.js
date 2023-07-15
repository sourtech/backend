import cryptoRandomString from 'crypto-random-string';
import { cartService, productService, ticketService } from '../services/repositories/index.js';

const createTicket = async (req, res) => {
    // podria usar el que me llega por param req.params.cid, pero es lo mismo
    // mas seguro el de la base que tiene asignado el usuario
    const idCart = req.user.cart; 
    const cart = await cartService.getCartById(idCart);
    if(!cart){
        return res.sendErrorWithPayload('no existe cart');
    }
    //hago un nuevo arreglo SIN Stock (va a ser el nuevo carrito del usuario)
    const productosSinStock = cart.products.filter(producto => producto.quantity>producto._id.stock);
    //Con stock (los que voy a descontar stock)
    const productosConStock = cart.products.filter(producto => producto.quantity<=producto._id.stock);
    //La suma de todos los productos que termina compando

    await cartService.removeAll(idCart);

    //De los que si tengo stock, los recorro para bajar el stock en productos
    productosConStock.forEach( async (prod) => {
        let newStock = {
            stock: prod._id.stock-prod.quantity
        }
        await productService.downStock({ _id: prod._id._id }, newStock)  
        
        const nuevo = {
            _id:prod._id._id, 
            quantity:prod.quantity
        };
        const result = await cartService.addProduct({ _id: idCart }, nuevo);       
    });

    //al carrito del usuario ahora le dejo los que no pudo comprar


    /*
    productosSinStock.forEach( async (prod) => {
        let nuevo = {
            _id:prod._id._id, 
            quantity:prod.quantity
        };
        console.log(nuevo)
        await cartService.addProductNew(idCart, nuevo);
    });
*/
/*
    const amount = productosConStock.reduce((accumulator, current) => accumulator + current.quantity, 0)
    //genero el ticket
    const ticket = {
        code: cryptoRandomString({length: 10}),
        amount: amount,
        purchaser: req.user.email
    }

    const newTicket  = await ticketService.createTicket(ticket);
*/
 console.log(newTicket)
 


    return res.status(200).send();
    //return res.status(200).send({ products });
}


export default {
    createTicket
}