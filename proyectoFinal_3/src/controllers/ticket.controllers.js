import { cartService, productService, ticketService } from '../services/repositories/index.js';

const createTicket = async (req, res) => {
    const idCart = req.user.cart;
    const cart = await cartService.getCartById(idCart);
    if(!cart){
        return res.sendErrorWithPayload('no existe cart');
    }
    let newCart = []; //aca el carro sin stock, que pasara a ser el nuevo carro
    let cartStock = []; //aca voy a tener el carro para enviar
    //recorro los productos

    const pepe = cart.products.forEach(async function (product){
        //compruebo si tengo stock
        const prod = await productService.getProductById(product._id._id);
        if(prod.stock<product.quantity){
            //sin stock
            newCart.push({_id:prod._id, quantity:product.quantity});
        }else{
            //con stock
            //descuento al stock
            let newStock = prod.stock - product.quantity
            //creo en nuevo carro
            cartStock.push({_id:prod._id, quantity:newStock});
        }
    });   
console.log(pepe);
    console.error('Nuevo carrito');
    console.log(newCart);
    console.error('vendido')
    console.log(cartStock);    

    //limit puede llegar como query string
    //console.log(req);
    /*
    const limit = req.query.limit;

    // traigo todos los productos
    const products = await productService.getProducts();

    //si tengo limit y es numerico
    if(limit && limit.match(/^[0-9]+$/) != null){
        //si el limit es superior a la cantidad no importa, muestro los que tengo
        //NUEVO
        //en la sigiente etapa el limit lo tengo que hacer directamente en MONGO no traer todo y luego limitar
        const limitProducts = products.docs.slice(0, limit);
        return res.send(limitProducts);
    }
    // sin limit
    */
    return res.status(200).send();
    //return res.status(200).send({ products });
}


export default {
    createTicket
}