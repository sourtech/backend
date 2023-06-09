import ProductManager from '../components/productManager.js';
import __dirname from '../utils.js';
const manager = new ProductManager(`${__dirname}/data/products.json`);    

export default function socketRealTime(io){
    io.on('connection', async socket => {
        console.log("cliente conectado");        
        const products = await manager.getProducts();
        
        //listado de productos
        socket.emit('products', products);

        //borrado de un producto
        socket.on('delete', async pid => {
            //console.log(pid);
            const result = await manager.deleteProduct(Number(pid));          
        });
        
        //agregar
        socket.on('add', async product => {
            try {       
                product.status = product.status==1 ? true : false; 
                product.thumbnails = []; // por ahora no recibo imagenes                   
                const result = await manager.addProduct(product);
            }
            catch (err) {
                console.log(err);
            }
            
        });
    }) 
}
