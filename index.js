const express = require('express');
require('dotenv').config();
const path = require('path');
const app = express();
const userRouter = require('./routes/users');
const PORT = 8000;
const cookieParser = require('cookie-parser');
const dbConnection = require('./config/dbConnection');
const { verifyTokenByCookie } = require('./middleware/auth');

dbConnection(process.env.MONGO_URL);

app.set('view engine', 'ejs'); // ✅ correct
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
app.use('/api', userRouter);
app.get('/', (req, res) => {
    res.render('home', {user: req.user});
}) 
app.get('/login', (req, res) => {
    res.render('login');
}) 
app.get('/sign-up', (req, res) => {
    res.render('signup');
}) 
app.listen(PORT, () => {
    console.log(`Listening at port: ${PORT}`);
});