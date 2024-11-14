const multer  = require('multer')

module.exports = () => {
  const storage = multer.diskStorage({
    
    destination: function (req, file, cb) {
      cb(null, `.${__dirname}/public/uploads`)
    },
    filename: function (req, file, cb) {
      // console.log( "origin:" + file.originalname.split('-').length);
      // console.log( "origin--2:" + file.originalname.split('-'));
      // if(file.originalname.split('-').length >= 2 ){
      //   cb(null, `${file.originalname}`)
      // }
      // else{
      //   const uniqueSuffix = Date.now();
      //   cb(null, `${uniqueSuffix}-${file.originalname}` )
      // }
      const uniqueSuffix = Date.now();
      cb(null, `${uniqueSuffix}-${file.originalname}` )
    }
  })
  
  return storage;
}