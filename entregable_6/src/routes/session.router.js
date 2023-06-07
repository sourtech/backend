import { Router } from "express";
import passport from 'passport';
import UserManager from "../dao/mongo/managers/userManager.js";


const manager = new UserManager();

const router = Router();

/*
* Registro
*/
router.post('/register', passport.authenticate('register', {failureRedirect:'/api/sessions/registerFail', failureMessage:true}), async (req,res)=>{
	res.send({status:"success",message:"Registered"});
});

router.get('/registerFail',(req,res)=>{
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
router.post('/login', passport.authenticate('login', {failureRedirect:'/api/sessions/loginFail', failureMessage:true}), async (req, res)=>{
    req.session.user = {
        name: req.user.name,
        role: req.user.role,
        id: req.user.id,
        email: req.user.email
    }
    return res.send({ status: "success" });
  });

router.get('/loginFail',(req,res)=>{
	console.log(req.session.messages);
	res.status(400).send(
		{
			status:"error", 
			error:req.session.messages
		}
	);
})  

/*
* Logout
*/
router.get("/logout", (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			return res.status(500).send({ status: "error", error: "Error al cerrar sesión" });
		}  
		res.redirect('/login');
	});
});  

/* Github */
router.get('/github', passport.authenticate('github'), (req,res)=>{

})

router.get('/githubcallback',passport.authenticate('github'),(req,res)=>{
    const user = req.user;
    req.session.user = {
        id: user.id,
        name: `${user.first_name} ${user.last_name}`,
        role:user.role,
        email:user.email
    }
    res.redirect('/products');
})


export default router;