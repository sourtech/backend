import { generateToken } from '../utils.jwt.js'

const setRegister = async (req, res) => {
    res.send({status:"success",message:"Registered"});
}

const setLogin = async (req, res) => {
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
}

const setLogout = (req, res) => {
    try {
        res.clearCookie('authToken')
        return res.redirect('/login');
    } catch (error) {
        req.logger.error(error);
    }	
}

const setGitHubCall = (req, res) => {
    const user = {
        id: req.user.id,
        name: `${req.user.first_name} ${req.user.last_name}`,
        role:req.user.role,
        email:req.user.email,
        cart: req.user.cart
    }
    req.logger.debug("el usuario de git");
    req.logger.debug(user);

    const access_token = generateToken(user)

    return res.cookie('authToken', access_token, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,

    }).redirect('/products/');
}

export default {
    setRegister,
    setLogin,
    setLogout,
    setGitHubCall
}