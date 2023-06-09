import express from 'express';
import handlebars from 'express-handlebars';

import ProductManager from './components/productManager.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';
import __dirname from './utils.js';
import { Server } from 'socket.io';
import socketRealTime from './components/socketRealTime.js';


const app = express();
const PORT = 8080;//puerto del server

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(`${__dirname}/public`));

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('partials', `${__dirname}/views/partials`);
app.set('view engine', 'handlebars');


app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
//Vistas 
app.use('/', viewsRouter);

const server = app.listen(PORT, () => {
    try {
        console.log(`Server up!`);
    }
    catch (err) {
        console.log(err);
    }
});
const io = new Server(server);
socketRealTime(io);