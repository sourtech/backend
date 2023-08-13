
export default class ProductRepository {

    constructor(dao){
        this.dao = dao;
    }

    getProducts = (options, req, paginate) => {
        return this.dao.getProducts(options, req, paginate);
    }

    getProductById = (id) => {
        return this.dao.getProductById(id)
    }

    addProduct = (product) => {
        return this.dao.addProduct(product)
    }

    updateProduct = (id, product) => {
        return this.dao.updateProduct(id,product)
    }
/*
    downStock = (id, product) => {
         return this.dao.downStock(id, product)
    }
*/
}