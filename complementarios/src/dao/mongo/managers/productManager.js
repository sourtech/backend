import productModel from "../models/products.js";

export default class ProductsManager {

    getProducts = (params) => {
        return productModel.find(params).lean();
    };

    getProductById = (params) => {
        console.log(params);
        return productModel.findOne(params).lean();
    };

    addProduct = (product) => {
        //por el momento no voy a validar nada del produco
        //es solo para poder usar mongo y comprobar que todo funcione
        return productModel.create(product);
    };

    deleteProduct = (id) => {
        return productModel.findByIdAndDelete(id);
    };    

    updateproduct = (id, product) => {
        return productModel.findByIdAndUpdate(id, { $set: product });
    };


}