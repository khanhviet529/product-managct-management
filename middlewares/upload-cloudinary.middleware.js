const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET // Click 'View API Keys' above to copy your API secret
});
module.exports.upload =  (req, res, next) =>  {
  if(req.file) {
    let streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream(
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };
    async function upload(req) {
      try {
        let result = await streamUpload(req);
        // console.log(result);
        // console.log('result.url', req.file);
        req.body[req.file.fieldname] = result.url;
        next();
        // res.status(200).json({ message: 'Upload successful', result }); // Gửi phản hồi thành công
      } catch (error) {
        console.error('Error during upload:', error);
        // res.status(500).json({ message: 'Upload failed', error: error.message }); // Gửi phản hồi lỗi
      }
    }
    upload(req);
  }
  else{ 
      next();
  }
};