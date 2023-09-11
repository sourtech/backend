
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

    updateUsers = (id, user) => {
        return this.dao.updateUsers(id,user)
    }

    deleteTest = (user) => {
        return this.dao.deleteOneUser(user)
    }

    lastConection = (uid) => {
        return this.dao.lastConection(uid)
    }

    updateDocs = (uid, documents) => {
        return this.dao.updateDocs(uid, documents)
    }
}