module.exports = function checkAuth(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        return next(err);
    }
};