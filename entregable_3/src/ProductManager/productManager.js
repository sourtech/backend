import fs from 'fs';

export default class ProductManager {

    constructor(file){
        //this.lastID = 1;
        this.products = [];   
        this.path = file;
    }   

    #lastID = () => {
        const newID  = this.products.length > 0 ? this.products[this.products.length - 1].id + 1 : 1;
        return newID;
    }; 
    
    #saveFile = async () => {
        try {
            const toJSON = JSON.stringify(this.products, null, 2);
            await fs.promises.writeFile(this.path, toJSON)
            return null;
        }
        catch (err) {
            return console.log(err);

        }
    };    
    
    addProduct = async(nuevo) => {

        //valido que todos los campos esten cargados
        if(!nuevo.title || !nuevo.description || !nuevo.price || !nuevo.thumbnail || !nuevo.code || !nuevo.stock){
            console.log("Todos los datos son obligatorios");
            return null;
        }

        //traigo el archivo de productos
        this.products = await this.getProducts();

        //compruebo que el campo code no exista
        
        if(this.products.find(p => p.code === nuevo.code)){
            console.log("El codigo ya existe " + nuevo.code);
            return null;
        }
        //nuevo ID
        //nuevo.id = this.lastID++;        
        nuevo.id = this.#lastID();

        //agrego el nuevo producto
        this.products.push(nuevo);
        //guardo
        await this.#saveFile();
        
    }

    getProducts = async () => {
        //compruebo si el archivo ya existe
        if (fs.existsSync(this.path)) {
            try {
                const readFile = await fs.promises.readFile(this.path, 'utf-8');
                return JSON.parse(readFile)
            }
            catch (error) {
                console.log(error);
                return null;
            }
        }
        //console.log(`el archivo no existe`);
        return [];//devuelvo un arreglo vacio
    };

    getProductById = async (id) =>{
        //traigo el archivo de productos
        this.products = await this.getProducts();
        
        const product = this.products.find(p => p.id === id);
        if(product){
            return product;
        }
        console.log("Not found ID:" + id);
        return null;
    }

    updateProduct = async (id, prodUpdate) => {
        
        try {
            //traigo el archivo de productos pero ahora en una variable local
            const products  = await this.getProducts();

            //busco el indice para comprobar si existe
            const index = products.findIndex(p => p.id === id);

            if (index < 0) {
                console.log(`No exists: ${id}`)
                return null
            }

            //recorro con map y si es el ID con assign cambio el valor
            this.products = products.map(element => {
                if(element.id == id){
                    element = Object.assign(element, prodUpdate);
                    return element
                }
                return element
            })  
            
            //guardo
            await this.#saveFile();

        }
        catch (err) {
            return console.log(err);
        }
        
    }    

    deleteProduct = async (id) => {
        
        try {
            //traigo el archivo de productos pero ahora en una variable local
            const products  = await this.getProducts();

            //busco el indice para saber si existe el proudcto
            const index = products.findIndex(p => p.id === id);

            if (index < 0) {
                console.log(`No exists: ${id}`)
                return null
            }

            //recorro los productos que no sean ese id
            products.forEach(e => {
                if(e.id !== id){
                    this.products.push(e)
                }
            })        

            //guardo
            await this.#saveFile();

        }
        catch (err) {
            return console.log(err);
        }
    }  
    
}

/*
const prod = new ProductManager('./src/ProductManager/products.json');
const context = async () => {
    //agrego productos
    await prod.addProduct({title:'Manzana2',description:'producto uno',price: 10,thumbnail:'img/10.jpg',code:'abc123',stock:2});
    await prod.addProduct({title:'Pera',description:'producto dos',price: 15,thumbnail:'img/15.jpg',code:'abc122',stock:3});
    await prod.addProduct({title:'Tomate',description:'producto tres',price: 20,thumbnail:'img/20.jpg',code:'abc121',stock:4});
    await prod.addProduct({title:'Tomate 2',description:'producto tres',price: 20,thumbnail:'img/20.jpg',code:'abc12s1',stock:4});

    //listado
    //console.log(await prod.getProducts());
    //por id
    //console.log(await prod.getProductById(2));

    //actualizar
    await prod.updateProduct(4, {title:'Manzana actualizada', description:'desc'});
    //await prod.updateProduct(4, {title:'Tomates perita',description:'producto actualizado',price: 10,thumbnail:'img/10_update.jpg',code:'abc123',stock:2});

    //borrar
    //await prod.deleteProduct(2);
}
context();
*/

