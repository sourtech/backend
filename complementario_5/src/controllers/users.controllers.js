import sharp from "sharp";
import { userService } from '../services/repositories/index.js';
import __dirname from "../utils.js";

const setRol = async (req, res) => {
    const {role} = req.body;

    //si quiere pasar a premmium hay alguns requisitos
    if(role==='premium'){
        const user = await userService.getUsersBy({_id:req.user.id});
        if(!user.documents){
           return res.sendBadRequest("Tiene que tener la documentacion subida para cambiar de rol");
        }
        //comprobamos que docuemntacion tiene subida
        let dni,domicilio,cuenta=false;
        user.documents.forEach(async (e) => {
            if(e.name==='dni') dni = true;
            if(e.name==='domicilio') domicilio = true;
            if(e.name==='cuenta') cuenta = true;
        }); 
    
        if(!dni || !domicilio || !cuenta){
            let string = 'Los tres tipos de documentos son necesario para cambiar de rol';
            return res.sendBadRequest("Los tres tipos de documentos son necesario para cambiar de rol");
        }
    }

    //solo permitimos estos dos roles
    if(role==='usuario' || role==='premium'){
        const dataUser = {role:role};
        if(req.file){
            dataUser.image = req.file.filename;
            //creo los recortes 
            sharp(req.file.path)
                .resize(40,40, { fit:  "contain" })
                .toFile(`${__dirname}/public/img/profile/40x40_${req.file.filename}`);
        }
        await userService.updateUsers(req.user.id, dataUser);
        return res.sendSuccess("Rol actualizado con exito! seras redireccionado para que vuelvas a logearte")
    }
    res.sendBadRequest("Accion no permitida");
}

const setDocument = async (req, res) => {
    let docs = [];
    let cantidad = 0;

    const user = await userService.getUsersBy({_id:req.user.id});
    if(user.documents){
        docs = user.documents;
    }

    if(req.files.dni){
        req.files.dni.forEach(async (e) => {
            docs.push({name:'dni',reference:e.filename})
        }); 
        cantidad++;
    }
    if(req.files.domicilio){
        req.files.domicilio.forEach(async (e) => {
            docs.push({name:'domicilio',reference:e.filename})
        });
        cantidad++;       
    }
    if(req.files.cuenta){
        req.files.cuenta.forEach(async (e) => {
            docs.push({name:'cuenta',reference:e.filename})
        }); 
        cantidad++;      
    }
    if(docs.length>0){
        //console.log(req.user.id);
        console.log(cantidad)
        await userService.updateDocs(req.user.id, {documents:docs})
    }
    if(cantidad>0){
        return res.sendSuccess();
    }
    res.sendErrorWithPayload({error:'No agrego ningun nuevo docuemnto'})
}

export default {
    setRol,
    setDocument,
}