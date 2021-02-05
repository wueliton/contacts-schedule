exports.globalMiddleware = (req, res, next) => {
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    res.locals.user = req.session.user;
    next();
}

exports.checkToken = (err, req, res, next) => {
    if(err) {
        return res.render('404');
    }

    next();
};

exports.generateToken = (req, res, next) => {
    res.locals.formToken = req.csrfToken();
    next();
}

exports.loginRequired = (req, res, next) => {
    if(!req.session.user) {
        req.flash('errors', 'Você precisa estar logado.');
        req.session.save(() => res.redirect('/'));
        return;
    }

    next();
}