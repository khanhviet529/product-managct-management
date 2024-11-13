const app = require('express');
const router = app.Router();
const homeController = require('../../controllers/client/home.controller');

router.get('/', homeController.index);
module.exports = router;