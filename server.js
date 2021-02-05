require('dotenv').config();
const express = require('express');
const app = express();
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const routes = require('./routes');
const path = require('path');
const helmet = require('helmet');
const csrf = require('csurf');
const { globalMiddleware, checkToken, generateToken } = require('./src/middlewares/middleware');

mongoose.connect(process.env.BDCONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.emit('ready');
    }).catch((e) => {
        console.log(e);
    });

const sessionOptions = session({
    secret: 'ksdasd2wm1343jemfi4j05rforent45j654',
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
});

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(sessionOptions);
app.use(flash());
app.use(csrf());
app.use(globalMiddleware); //Middleware Global
app.use(checkToken);
app.use(generateToken);
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');
app.use(routes);

app.on('ready', () => {
    app.listen(3000, () => {
        console.log('Server runing on http://localhost:3000/');
    });
});
