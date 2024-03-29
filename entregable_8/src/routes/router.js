import { Router } from 'express';
import { passportCall } from '../utils.js';

export default class BaseRouter {
    constructor() {
        this.router = Router();
        this.init();
    }

    init() { };

    getRouter = () => this.router;

    get(path, policies, ...callbacks) {
       // console.log("entre al get "+policies);
        this.router.get(path, passportCall('jwt', { strategyType: 'jwt' }), this.handlePolicies(policies), this.generateCustomResponses, this.applyCallbacks(callbacks));
    }
    post(path, policies, ...callbacks) {
        this.router.post(path, passportCall('jwt', { strategyType: 'jwt' }), this.handlePolicies(policies), this.generateCustomResponses, this.applyCallbacks(callbacks));
    }
    put(path, policies, ...callbacks) {
        this.router.put(path, passportCall('jwt', { strategyType: 'jwt' }), this.handlePolicies(policies), this.generateCustomResponses, this.applyCallbacks(callbacks));
    }
    delete(path, policies, ...callbacks) {
        this.router.delete(path, passportCall('jwt', { strategyType: 'jwt' }), this.handlePolicies(policies), this.generateCustomResponses, this.applyCallbacks(callbacks));
    }

    generateCustomResponses = (req, res, next) => {
        res.sendSuccess = message => res.send({ status: 'success', message });
        res.sendSuccessWithPayload = payload => res.send({ status: 'success', payload });
        res.sendErrorWithPayload = payload => res.send({ status: 'error', payload });
        res.sendInternalError = error => res.status(500).send({ status: 'error', error });
        res.sendUnauthorized = error => res.status(400).send({ status: 'error', error });
        next();
    };

    handlePolicies = policies => {
        //console.log(Array.isArray(policies, 'policies'));
        return (req, res, next) => {
            if (policies[0] === "PUBLIC"){
                return next();
            }
            const user = req.user;
            if (policies[0] === "LOGIN" && !user){
                return res.redirect('/login');
            }
            if (policies[0] === "LOGIN" && user){
                return next();
            }            
            if (policies[0] === "github") {
               // console.log('politica github');
                return next();
            }
            if (policies[0] === "AUTH" && !user) {
                return res.status(401).send({ status: "error", error: "Unauthorized Router doesn't exist the user" });
            }
            if (policies[0] === "AUTH" && user) {                
                return next();
            }            
            if (policies[0] === "NO_AUTH" && user){
                return res.status(401).send({ status: "error", error: "Unauthorized Router" });
            }
            if (policies[0] === "NO_AUTH" && !user){
                return next();
            } 
            if (policies[0] === "USER" && user ){
                if(user.role==='usuario'){
                    return next();
                }
                return res.status(401).send({ status: "error", error: "Only user" });
            }  
            
            if (policies[0] === "ADMIN" && user ){
                if(user.role==='admin'){
                    return next();
                }
                return res.status(401).send({ status: "error", error: "Only admin" });
            }  

            if (!user) return res.status(401).send({ status: "error", error: req.error });
          //  console.log(policies[0]);
           // console.log("estamos");
           // console.log(user.role);
            if (!policies.includes(user.role.toUpperCase())){
                return res.status(403).send({ status: "error", error: "Forbidden" });
            }
            next();
        }
    }

    applyCallbacks(callbacks) {
        return callbacks.map(callback => async (...params) => {
            try {
                await callback.apply(this, params);
            } catch (error) {
                //console.log(params[1]);
               // params[1].status(500).send(error);
                console.log(error); // ahora para mostrar el log del servidor
                params[1].status(error.status).send({status:"error",error:error.name})
            }
        })
    }
}