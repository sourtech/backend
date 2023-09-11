import BaseRouter from "./router.js";
import usersController from "../controllers/users.controllers.js";
import { passportCall } from "../utils.js";

import uploader from "../services/uploader.js";

export default class usersRouter extends BaseRouter {
    init() {
		this.post("/premium", ['AUTH'], passportCall('jwt', { strategyType: "jwt" }), uploader('profile').single('perfil'), usersController.setRol);
		this.post('/documents', ['USER'], passportCall('jwt', {strategyType: 'jwt'}), uploader('documents').fields([{ name: 'dni', maxCount: 10 }, { name: 'domicilio', maxCount: 10 }, { name: 'cuenta', maxCount: 10 }]), usersController.setDocument);
    }
}