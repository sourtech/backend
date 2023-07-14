import productsController from '../controllers/products.controllers.js';
import BaseRouter from "./router.js";
import { passportCall } from "../utils.js";

export default class ProductsRouter extends BaseRouter {
    init() {
        this.get('/', ['AUTH'], passportCall('jwt', {strategyType: 'jwt'}), productsController.getProducts);
        this.get('/:pid', ['AUTH'], passportCall('jwt', {strategyType: 'jwt'}), productsController.getProductId)
        this.post('/', ['ADMIN'], passportCall('jwt', {strategyType: 'jwt'}), productsController.setProduct)
        this.put('/:pid', ['ADMIN'], passportCall('jwt', {strategyType: 'jwt'}), productsController.updateProduct)
        this.delete('/:pid', ['ADMIN'], passportCall('jwt', {strategyType: 'jwt'}), productsController.deleteProduct)
    }
}


