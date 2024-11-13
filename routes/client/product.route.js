const app = require('express');
const router = app.Router();
const controller = require('../../controllers/client/product.controller');

router.get('/', controller.index);

router.get('/detail/:slug', controller.detail)

module.exports = router;