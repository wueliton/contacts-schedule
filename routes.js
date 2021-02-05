const express = require('express');
const route = express.Router();
const homeController = require("./src/controllers/homeController");
const loginController = require("./src/controllers/loginController");
const contatoController = require("./src/controllers/contatoController");
const { loginRequired } = require("./src/middlewares/middleware");

//Routes Home Page
route.get('/', homeController.index);

//Routes Login
route.get('/login/index', loginController.index);
route.post('/login/register', loginController.register);
route.post('/login/login', loginController.login);
route.get('/login/logout', loginController.logout);
route.get('/contato/index', loginRequired, contatoController.index);
route.post('/contato/register', loginRequired, contatoController.register);

module.exports = route;
