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
    const user = await manager.getUsersBy({ email, password });
    console.log(user);
    if (!user) {
      return res
        .status(400)
        .send({ status: "error ", error: "usuario no encontrado" });
    }
    if(email === "adminCoder@coder.com" && password === "123456") {
        req.session.user = {
            name: "Coder Admin",
            email: user.email,
            role: "admin",
        };
    } else {
        req.session.user = {
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            role: "usuario",
        };
    }
    res.send({ status: "success" });
  });

  /*
   * Logout
  */
  router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error al destruir la sesión:", err);
        return res
          .status(500)
          .send({ status: "error", error: "Error al cerrar sesión" });
        }  
        res.redirect('/login');
    });
  });  


export default router;