module.exports = (req, res) => {
    console.log(req.session);
    res.render('cisHome/views/home');
}