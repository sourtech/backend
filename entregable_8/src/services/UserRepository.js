
export default class UserRepository {
    
    constructor(dao){
        this.dao = dao;
    }

    getCartById = (cartId) => {
        return this.dao.getCartById(cartId);
    }
    
    getUsersBy = (uid) => {
        return this.dao.getUsersBy(uid);
    }    

    createUsers = (user) => {
        return this.dao.createUsers(user)
    }
}