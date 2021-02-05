exports.index = (req, res) => {
    res.render('index');
}

exports.formSend = (req, res) => {
    res.send(req.body);
}