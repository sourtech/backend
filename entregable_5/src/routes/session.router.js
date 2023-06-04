import { Router } from "express";
import UserManager from "../dao/mongo/managers/userManager.js";

const manager = new UserManager();

const router = Router();

/*
* Registro
*/
router.post("/register", async (req, res) => {
    const result = manager.createUsers(req.body);
    res.send({ status: "success", payload: result });
});

/*
 * Login
*/
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

	//que esten los dos datos, user y pass
    if(!email || !password){
    	return res.status(400).send({ status: "error ", error: "Debe ingresar el usuario y contraseña" });
    }
	let validUser = {};
	//si es el usuario especial
	if(email === "adminCoder@coder.com" && password === "adminCod3r123") {
		validUser = {
			name: "Coder Admin", 
			email: "adminCoder@coder.com", 
			role: "admin"
		};
	}else{
		//si no es especial busco en base
		const user = await manager.getUsersBy({ email });
		if (!user || password!==user.password) {
			return res.status(400).send({ status: "error ", error: "usuario no encontrado" });
		}
		validUser = {
			name: `${user.first_name} ${user.last_name}`, 
			email: user.email, 
			role: "usuario"
		};		
	}
	//guardo en sesion
	req.session.user = validUser;
	res.send({ status: "success" });    
  });

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


export default router;