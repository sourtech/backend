export default (error,req,res,next) => { // Es nuestro salvador! Éste es el que define que NUNCA caiga el server
    console.log(error);
    console.log("por aca");
    res.status(error.status).send({status:"error",error:error.name})
}