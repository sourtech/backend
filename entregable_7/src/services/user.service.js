
export default class UserService {
    
    constructor(dao){
        this.dao = dao;
    }

    getCartById = (cartId) => {
        return this.dao.getCartById(cartId);
    }

}