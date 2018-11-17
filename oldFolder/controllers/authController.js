const exports = module.exports = {};

exports.logout = (req,res) => {
    req.session.destroy((err) => {
        res.redirect('/');
    });
};