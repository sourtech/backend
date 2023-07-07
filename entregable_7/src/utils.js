import {fileURLToPath} from 'url';
import { dirname } from 'path';
import bycrypt from 'bcrypt';
import passport from 'passport';

export const createHash = async(password) => {
    //Generar los salts
    const salts = await bycrypt.genSalt(10);
    return bycrypt.hash(password, salts);
}

export const validatePassword = async (password, hashedPassword) => bycrypt.compare(password, hashedPassword);

export const passportCall = (strategy,options={}) =>{
    console.log(strategy, options.strategyType, 'estrategia');
    return async(req,res,next) =>{
        // if(strategy === 'AUTH') return next();
        passport.authenticate(strategy,(error,user,info)=>{
            //console.log(info);
            //console.log(user);
            if(error) return next(error);
            if(!options.strategyType){
                console.log(`Route ${req.url} doesn't have defined a strategyType`);
                return res.sendInternalError(`Route ${req.url} doesn't have defined a strategyType`);
            }

            if(!user) {
                //¿Qué significa el que no haya encontrado user en cada caso?
                switch(options.strategyType) {
                    case 'jwt':
                        //console.log('jwt');
                        req.error = info.message?info.message:info.toString();
                        return next();
                    case 'locals':
                        return res.sendUnauthorized(info.message?info.message:info.toString())
                    case 'github':
                        console.log('github');
                        return next();
                    
                }
            }

            req.user = user;
            next();
        })(req,res,next);
    }
}

export const cookieExtractor = (req) =>{
    let token = null; 

    if(req&&req.cookies) {
        //console.log("la cookie existe");
        token = req.cookies['authToken']
    }
    return token;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export default __dirname;