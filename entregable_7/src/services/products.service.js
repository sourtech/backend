
export default class ProductService {

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
   
    updateProduct = (id) => {
        return this.dao.updateProduct(id)
    }
}