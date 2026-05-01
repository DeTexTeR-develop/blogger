function requireAuth(req, res, next) {
    if (req.user) {
        return next();
    }
    res.redirect('/user/login');
}

module.exports = requireAuth;
