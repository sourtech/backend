
export default class CartService {
    constructor(dao){
        this.dao = dao;
    }

    getCarts = () => {
        return this.dao.getCarts();
    }

    getCartById = (cid) => {
        return this.dao.getCartById(cid)
    }

    addCart = (cart) => {
        return this.dao.addCart(cart)
    }

    addProduct = (cid, nuevo) => {
        return this.dao.addProduct(cid, nuevo)
    }

    removeAll = (cid) => {
        return this.dao.removeAll(cid)
    }

    removeProduct= (cid, productId) => {
        return this.dao.removeProduct(cid, productId)
    }

}