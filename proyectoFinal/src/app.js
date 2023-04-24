import express from 'express';

import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js'
import __dirname from './utils.js';

const app = express();
const PORT = 8080;//puerto del server

app.use(express.json());//para leer json
app.use(express.urlencoded({extended:true})); //si recibo desde url
app.use(express.static(`${__dirname}/public`));//por el momento no uso esta carpeta, la dejo para el futuro


app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);


app.listen(PORT, () => {
    try {
        console.log(`Server up!`);
    }
    catch (err) {
        console.log(err);
    }
});