const express = require('express');
const methodOverride = require('method-override');
const flash = require('express-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const routerClient = require('./routes/client/index.route');
const routerAdmin = require('./routes/admin/index.route');
const bodyParser = require('body-parser');
const database = require('./config/database');
const systemConfig = require('./config/system');

database.connect();

const app = express();
const port = process.env.PORT ;
app.set('view engine', 'pug');
app.set('views', `${__dirname}/views`);

//overrider method
app.use(methodOverride('_method'));
// App Locals Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());

//flash
app.use(cookieParser('zxcvvvvbbbb'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

//Router
routerClient(app);
routerAdmin(app);
  
// Phía bên người dùng sẽ xem được những mục được public
app.use(express.static(`${__dirname}/public`));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


