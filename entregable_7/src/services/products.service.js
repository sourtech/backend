
export default class ProductService {
    constructor(dao){
        this.dao = dao;
    }
    getProducts = (options, req, paginate) => {
        return this.dao.getProducts(options, req, paginate);
    }
   
}