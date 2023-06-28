import express from 'express';
//import session from 'express-session';
import handlebars from 'express-handlebars';
//import MongoStore from 'connect-mongo';
import mongoose from "mongoose";
//import passport from 'passport';
import cookieParser from 'cookie-parser'
/*rutas*/
import ProductsRouter from './routes/products.router.js';
import CartsRouter from './routes/carts.router.js';
import SessionRouter from "./routes/session.router.js";
import ViewsRouter from './routes/views.router.js';

import initializePassportStrategies from './config/passport.config.js';
import __dirname from './utils.js';
import { Server } from 'socket.io';
import socketRealTime from './listeners/socketRealTime.js';
import registerChatHandler from './listeners/chat.js';

const app = express();
const PORT = 8080;//puerto del server

const DB_USER = 'hernanroig';
const DB_PASS = 'EiqvRFFEJ6KOuEYK';
const DB_DB = 'ecommerce';

const connection = mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@clustercitofeliz.ykziudq.mongodb.net/${DB_DB}?retryWrites=true&w=majority`);

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(`${__dirname}/public`));
app.use(cookieParser("cookieFirmada"));

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('partials', `${__dirname}/views/partials`);
app.set('view engine', 'handlebars');
/*
app.use(session({
    store: new MongoStore({
        mongoUrl:`mongodb+srv://${DB_USER}:${DB_PASS}@clustercitofeliz.ykziudq.mongodb.net/${DB_DB}?retryWrites=true&w=majority`,
        ttl: 3600,
    }),
    secret:"micarrosecreto",
    resave:false,
    saveUninitialized:false
}))
*/
//app.use(passport.initialize());
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