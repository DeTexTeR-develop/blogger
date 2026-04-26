const express = require('express');
require('dotenv').config();
const path = require('path');
const app = express();
const userRouter = require('./routes/users');
const PORT = 8000;
const dbConnection = require('./config/dbConnection');

dbConnection(process.env.MONGO_URL);

app.set('view engine', 'ejs'); // ✅ correct
app.set('views', path.resolve('./views'));

app.use(express.json());

app.use('/api', userRouter);
app.get('/', (req, res) => {
    res.render('home');
}) 
app.listen(PORT, () => {
    console.log(`Listening at port: ${PORT}`);
});