const productModel = require('../../models/product.model');
const filterStatusHelper = require('../../helpers/filterStatus');
const searchHelper = require('../../helpers/search');
const objectPagination = require('../../helpers/pagination');
const systemConfig = require('../../config/system');

module.exports.product = async (req, res) => {
    // lấy param từ url
    let status = req.query.status;
    let currentPage = req.query.page || 1;
    let keyword = req.query.keyword || '';

    // Tìm kiếm và lọc sản phẩm
        //Lọc sản phẩm
        let find = {
            deleted: false,
        };
        if(status === 'true'){ 
            find.status = true;
        }
        else if(status === 'false'){ 
            find.status = false;
        }
        // Tìm kiếm sản phẩm
        const objectSearch = searchHelper(keyword);
        if(objectSearch.regex){
            find.title = objectSearch.regex;
        }

    // set active cho butoon lọc
    const filterStatus = filterStatusHelper(status);

    // pagination 
    const countProduct = await productModel.countDocuments(find); // đếm số lượng các bản ghi 
    const limitPage = 4; // số sản phẩm trên 1 trang
    const pagination = objectPagination(currentPage, limitPage , countProduct);
    // end pagination 
    
    // Render view
    try {
        const products = await productModel.find(find)
        .sort({position: "desc"})
        .limit(4)
        .skip(pagination.indexPage);
        res.render('admin/pages/products/index', {
            title: "trang sản phẩm",
            products: products,
            findStatus: filterStatus,
            keyword: objectSearch.keyword,
            pagination: pagination,
        });
    } catch (error) {
        console.error('Error in product controller:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports.changeStatus = async (req, res) => {
    req.flash('success', 'Cập nhật trạng thái thành công');
    const productId = req.params.id;
    const productStatus = req.params.status === 'active' ? true : false ;
    await productModel.updateOne({ _id:productId }, {$set: {
        status: productStatus
    }});
    res.redirect('back')
};

module.exports.changeMultiStatus = async (req, res) => {
    const {type , ids} = req.body;
   
    const arrIds = ids.split(", ");
    switch(type)
    {
        case "active":
            req.flash('success', `Cập nhật trạng thái của ${arrIds.length}  thành công`);
            await productModel.updateMany({_id: {$in: arrIds}},{ $set: {status: true}});
            break;
        case "inactive":
            req.flash('success', `Cập nhật trạng thái của ${arrIds.length}  thành công`);
            await productModel.updateMany({_id: {$in: arrIds}},{ $set: {status: false}});
            break;
        case "deleteMulti":
            req.flash('success', `Xóa ${arrIds.length} sản phẩm thành công`);
            await productModel.updateMany({_id: {$in: arrIds}},{ $set: {deleted: true}});
            break;
        case "changePosition":
            req.flash('success', `Thay đổi vị trí của ${arrIds.length} sản phẩm thành công`);
            for(item of arrIds){
                const [id, position] = item.split("-");
                await productModel.updateOne({ _id:id }, {$set: {
                    position: position
                }});
            }
            break;
        default:
            break;
    }
    res.redirect('back')
};

module.exports.delete = async (req, res) => {
    req.flash('success', 'Xóa sản phẩm thành công');
    const productId = req.params.id;
    await productModel.updateOne({ _id:productId }, {$set: {
        deleted: true,
        deletedAt: Date.now()
    }});
    res.redirect('back')
};

module.exports.create = async (req, res) => {
    // res.send('Create product');
    res.render('admin/pages/products/create');
};

module.exports.createPost = async (req, res) => {

    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    req.body.status = req.body.status === 'active' ? true : false;
    const count = await productModel.countDocuments();
    console.log(req.file);
    if(req.body.position === ""){
        req.body.position = count + 1;
    }
    else{
        req.body.position = parseInt(req.body.position);
    }
    req.body.thumbnail = `/uploads/${req.file.filename}`;
    const product = new productModel(req.body);
    product.save();
    // res.redirect('/admin/products'); // chạy vào router 
    res.redirect(`${systemConfig.prefixAdmin}/products`); // chạy vào router 
};

module.exports.edit = async (req , res) => {
    try{
        const find = {
            deleted: false,
            _id: req.params.id
        }
        const product = await productModel.findOne(find);

        res.render('admin/pages/products/edit' , {
            product:product
        });
    }catch{
        res.redirect(`${systemConfig.prefixAdmin}/products`); 
    }
}

module.exports.editPatch = async (req , res) => {
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    req.body.status = req.body.status === 'active' ? true : false;
    const count = await productModel.countDocuments();
    if(req.body.position === ""){
        req.body.position = count + 1;
    }
    else{
        req.body.position = parseInt(req.body.position);
    }
    
   
    if(req.file){
        req.body.thumbnail = `/uploads/${req.file.filename}`;
    }
    
    try{
        await productModel.updateOne({ _id: req.params.id } , req.body);
        req.flash('success', 'Cập nhật sản phẩm thành công');
    }catch{
        req.flash('error', 'Cập nhật sản phẩm thất bại');
    }
    res.redirect(`back`); // chạy vào router 
}

module.exports.detail = async(req , res) => {
    const id = req.params.id;
    console.log(id);
    const find = {
        deleted: false,
        status: true,
        _id: id
    }
    const productDetail = await productModel.findOne(find);
    res.render("admin/pages/products/detail", {
        productDetail: productDetail
    })
}