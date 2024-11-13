module.exports.dashboard = (req, res) => {
    console.log(req);
    res.render('admin/pages/dashboard/index', {
        title: "trang quản trị",
    })
}