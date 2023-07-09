import CartManager from "../dao/mongo/managers/cartManager.js"
import CartService from "./cart.service.js";

import ProductManager from "../dao/mongo/managers/productManager.js";
import ProductService from "./products.service.js";

//import UserManager from "../dao/mongo/managers/userManager.js";
//import UserService from "./user.service.js";

export const cartService = new CartService(new CartManager());
export const productService = new ProductService(new ProductManager());
//export const userService = new UserService(new UserManager());

