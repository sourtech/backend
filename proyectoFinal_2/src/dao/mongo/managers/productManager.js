import productModel from "../models/products.js";

export default class ProductsManager {

    /*
     * params puede llegar page, limit, sort
    */
    getProducts  = async (params, req, paginate=false) => {
        let filter = {};
        if(params){
            //ordenamiento
            if(params.sort){
                params.sort = { price: params.sort} // 1 o -1
            }
            //hay stock
            if(params.stock){
                filter.stock = { $gt : 0 };
                //lo elimino porque no lo necesito mas en los params
                delete params.stock;                
            }            
            //si filtra por categoria
            if(params.category){           
                filter.category = params.category;
                //lo elimino porque no lo necesito mas en los params
                delete params.category;
            }            
            params.lean = true;
        }
        //console.log(params);
        //console.log(filter);
        const products = await productModel.paginate(filter, params);
        if(!paginate){
            return products;
        }
        if(products){
            /*https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams*/
            let newUrl = req.originalUrl.replace('?','');
            newUrl = newUrl.replace('/','');
            const params = new URLSearchParams(newUrl);

            if(params.has('page')){
                params.delete('page');
                params.append('page', products.page);
            }
            if(products.hasPrevPage){
                params.set("page", products.prevPage);
                products.prevLink = params.toString();
            }
            if(products.hasNextPage){
                params.set("page", products.nextPage);
                products.nextLink = params.toString();
            }
        }
        return products;
    };

    createLinkPaginate = (url, param) => {
        const [path, searchParams] = url.split('?');  const newSearchParams = searchParams
          ?.split('&')
          .filter((p) => !(p === param || p.startsWith(`${param}=`)))
          .join('&');  return newSearchParams ? `${path}?${newSearchParams}` : path;
      }    

    getProductById = (params) => {
        return productModel.findOne(params).lean();
    };

    addProduct = (product) => {
        //por el momento no voy a validar nada del producto
        return productModel.create(product);
    };

    deleteProduct = (id) => {
        return productModel.findByIdAndDelete(id);
    };    

    updateproduct = (id, product) => {
        return productModel.findByIdAndUpdate(id, { $set: product });
    };


}