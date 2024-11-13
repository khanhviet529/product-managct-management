const express = require('express');
const router = express.Router();
const productController = require('../../controllers/admin/product.controller');
const multer  = require('multer')
const storage = require('../../helpers/storageMulter');
const validate = require("../../validates/product.validate");
const upload = multer({ storage: storage() })

router.get('/', productController.product);
router.patch('/change-status/:status/:id', productController.changeStatus);
router.patch('/change-multi-status', productController.changeMultiStatus);
router.delete('/delete/:id', productController.delete);

router.get('/create', productController.create);
router.post(
  '/create', 
  upload.single('thumbnail') ,  
  validate.createProduct,
  productController.createPost
);

router.get('/edit/:id', productController.edit);
router.patch(
  '/edit/:id',
  upload.single('thumbnail') ,  
  validate.createProduct,
  productController.editPatch
);

router.get(
  '/detail/:id',
  productController.detail
);

module.exports = router;