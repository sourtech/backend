import BaseRouter from "./router.js";
import sessionsController from "../controllers/session.controllers.js";
import { passportCall } from "../utils.js";

export default class SessionsRouter extends BaseRouter {
    init() {

		this.post('/register', ['NO_AUTH'], passportCall('register', { strategyType: "locals" }), sessionsController.setRegister);
		this.post('/login', ['NO_AUTH'], passportCall('login', { strategyType: "locals" }), sessionsController.setLogin);
		this.get("/logout", ['AUTH'], sessionsController.setLogout);
		this.get('/github', ['github'], passportCall('github', { strategyType: "github" }), (req, res) => {});
		this.get('/githubcallback', ['github'], passportCall('github', { strategyType: "github" }), sessionsController.setGitHubCall);
		//pedido especial
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
