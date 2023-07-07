//import { Router } from "express";
//import passport from 'passport';
import UserManager from "../dao/mongo/managers/userManager.js";
import BaseRouter from "./router.js";
import { passportCall } from "../utils.js";
import { generateToken } from '../utils.jwt.js'
import { privacy, authRoles } from "../middlewares/auth.js";

const manager = new UserManager();

//const router = Router();
export default class SessionsRouter extends BaseRouter {
    init() {
		/*
		* Registro
		*/
		//this.post('/register', passport.authenticate('register', {failureRedirect:'/api/sessions/registerFail', failureMessage:true}), async (req,res)=>{
		this.post('/register', ['NO_AUTH'], passportCall('register', { strategyType: "locals" }), async (req, res) => {			
			res.send({status:"success",message:"Registered"});
		});

		this.get('/registerFail',(req,res)=>{
			console.log(req.session.messages);
			res.status(400).send(
				{
					status:"error",
					error:req.session.messages
				}
			)
		})

		/*
		* Login
		*/
		this.post('/login', ['NO_AUTH'], passportCall('login', { strategyType: "locals" }), async (req, res) => {
		//this.post('/login', passport.authenticate('login', {failureRedirect:'/api/sessions/loginFail', failureMessage:true}), async (req, res)=>{
			const user = {
				name: req.user.name,
				role: req.user.role,
				id: req.user.id,
				email: req.user.email,
				cart: req.user.cart
			}
			const access_token = generateToken(user)

			return res.cookie('authToken', access_token, {
				maxAge: 1000 * 60 * 60 * 24,
				httpOnly: true,

			}).sendSuccess('success')			
			//return res.send({ status: "success" });
		});

		this.get('/loginFail',(req,res)=>{
			console.log(req.messages);
			res.status(400).send(
				{
					status:"error", 
					error:req.messages
				}
			);
		})  

		/*
		* Logout
		*/
		this.get("/logout", ['PUBLIC'], async (req, res) => {

            try {
                res.clearCookie('authToken')
				return res.redirect('/login');
            } catch (error) {
                console.log(error, 'logout error acá');
            }	
			/*		
			req.session.destroy((err) => {
				if (err) {
					return res.status(500).send({ status: "error", error: "Error al cerrar sesión" });
				}  
				res.redirect('/login');
			});
			*/
		});  

		/* Github */
		this.get('/github', ['github'], passportCall('github', { strategyType: "github" }), (req, res) => {

		});

		this.get('/githubcallback', ['github'], passportCall('github', { strategyType: "github" }), (req, res) => {
			const user = {
				id: req.user.id,
				name: `${req.user.first_name} ${req.user.last_name}`,
				role:req.user.role,
				email:req.user.email,
				cart: req.user.cart
			}
			console.log("el usuario de git");
			console.log(user);

			const access_token = generateToken(user)

			return res.cookie('authToken', access_token, {
				maxAge: 1000 * 60 * 60 * 24,
				httpOnly: true,

			}).redirect('/products/');

		})

		/*
		* Login
		*/
		this.get('/current', ['PUBLIC'], passportCall('jwt', {strategyType: 'jwt'}), async (req, res) => {
            try {  
				let token = null; 

				if(req&&req.cookies) {
					token = req.cookies['authToken'];
					res.sendSuccessWithPayload(req.cookies['authToken']);
				}
				
            }
            catch (err) {
                console.log(err);
                //aunque en realidad existe un error prefiero mostrar 404
                res.status(404).render('error/404')
            } 
		});		
	}
}
