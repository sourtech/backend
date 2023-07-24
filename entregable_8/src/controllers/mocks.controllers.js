import { generateProduct } from "../mocks/products.mocks.js";

const getProducts = async (req, res) => {
    try {  
        const { limit } = req.query 
        //si no llega limite queda en 100
        let count = limit ? limit : 100;

        const products = [];
        for(let i=0;i<count;i++){
            products.push(generateProduct());
        }
        res.sendSuccessWithPayload(products);
    }
    catch (err) {
        console.log(err);
    } 
}

export default {
    getProducts
}