const mongoose = require('mongoose');

const dbConnection = (url) => mongoose.connect(url)
.then(() => {
    console.log("db connected")
})
.catch((err) => {throw new Error("error occured while db connection", err)});

module.exports = dbConnection;