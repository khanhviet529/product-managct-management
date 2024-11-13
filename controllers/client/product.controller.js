const productModel = require('../../models/product.model.js');

module.exports.index =  async (req, res) => {
    const products = await productModel.find({
        status: true,
        deleted: false
    }).sort({position: "desc"});
    const newmProducts = products.map(product => {
    //    const newPrice = (product.price *( 100 - product.discountPercentage)/100).toFixed(2);
    //    return {
    //        ...product._doc,
    //        newPrice
    //    }
        product.newPrice = (product.price *( 100 - product.discountPercentage)/100).toFixed(2);
        return product;
    });
    console.log(newmProducts);
    res.render('client/pages/products/index', {
        title: "product",
        message: "product",
        products: newmProducts
    })
}

module.exports.detail =async (req, res) => {
   const slug = req.params.slug;
   console.log(slug);
   const find = {
        deleted: false,
        status: true,
        slug: slug
   }
   const productDetail = await productModel.findOne(find);
   console.log(productDetail);
   res.render("client/pages/products/detail" , {
        title: "Chi tiết sản phẩm",
        productDetail: productDetail
   })
}