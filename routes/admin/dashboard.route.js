const app = require('express');
const router = app.Router();
const dashboardController = require('../../controllers/admin/dashboard.controller');

router.get('/', dashboardController.dashboard);
module.exports = router;