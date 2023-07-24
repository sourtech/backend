import express from 'express';
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser'
/*rutas*/
import ProductsRouter from './routes/products.router.js';
import CartsRouter from './routes/carts.router.js';
import SessionRouter from "./routes/session.router.js";
import ViewsRouter from './routes/views.router.js';

import __dirname from './utils.js';
import { Server } from 'socket.io';
import socketRealTime from './listeners/socketRealTime.js';
import registerChatHandler from './listeners/chat.js';
import initializePassportStrategies from './config/passport.config.js';
import config from './config/config.js';
import errorHandler from './middlewares/error.js'

const app = express();
const PORT = config.port;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(`${__dirname}/public`));
app.use(cookieParser("cookieFirmada"));

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('partials', `${__dirname}/views/partials`);
app.set('view engine', 'handlebars');

initializePassportStrategies();

const sessionRouter = new SessionRouter();
const productsRouter = new ProductsRouter();
const cartsRouter = new CartsRouter();
const viewsRouter = new ViewsRouter();

app.use('/api/products', productsRouter.getRouter());
app.use('/api/carts', cartsRouter.getRouter());
app.use("/api/sessions", sessionRouter.getRouter());
//Vistas 
app.use('/', viewsRouter.getRouter());
//errores
app.use(errorHandler)

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
registerChatHandler(io);