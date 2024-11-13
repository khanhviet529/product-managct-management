module.exports.createProduct = (req, res, next) => {
  console.log(req.body);
  if (req.body.title.trim() === '') {
    req.flash('error', 'Xin vui lòng nhập tiêu đề');
    res.redirect('back');
    return;
  }
  // if (!req.file) {
  //   req.flash('error', 'Xin vui lòng chọn ảnh');
  //   res.redirect('back');
  //   return;
  // }
  next();
}