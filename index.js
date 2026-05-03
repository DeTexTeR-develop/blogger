const express = require('express');
require('dotenv').config();
const path = require('path');
const app = express();
const userRouter = require('./routes/users');
const blogRouter = require('./routes/blogs');
const PORT = 8000;
const cookieParser = require('cookie-parser');
const dbConnection = require('./config/dbConnection');
const { verifyTokenByCookie } = require('./middleware/auth');

dbConnection(process.env.MONGO_URL);

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(cookieParser());
app.use(verifyTokenByCookie('token'));

app.use((req, res, next) => {
    res.locals.user = req.user || null;
    res.locals.error = null;
    next();
}); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('home');
});

app.use('/user', userRouter);
app.use('/blogs', blogRouter);

app.use((req, res) => {
    res.status(404).send('404 — Page not found');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    const status = err.status || 500;
    const message = process.env.NODE_ENV === 'production'
        ? 'Something went wrong. Please try again.'
        : err.message;
    res.status(status).send(message);
});

app.listen(PORT, () => {
    console.log(`Listening at port: ${PORT}`);
});