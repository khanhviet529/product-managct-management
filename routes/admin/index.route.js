const dashboardRoute = require('./dashboard.route');
const productRoute = require('./product.route');
const systemConfig = require('../../config/system')
module.exports = (app) => {
    const pathAmin = systemConfig.prefixAdmin;
    app.use(pathAmin + '/dashboard' , dashboardRoute);
    app.use(pathAmin + '/products' , productRoute);
};