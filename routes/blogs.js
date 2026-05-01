
const express = require('express');
const {authMiddleware}= require('detexter-auth-kit');
const { createBlog, getAllBlogs } = require('../controllers/blogs');


const router = express.Router();

router.get('/', (req, res) => {
    res.render('blogs')
});
router.get('/', (req, res) => {
    res.render('home', {user: req.user});
});

router.get("/", (req, res) => {
    res.render('blogs')
})
router.post("/", authMiddleware({secret: process.env.JWT_SECRET}), createBlog);
router.get("/get-all-blogs", getAllBlogs);


module.exports = router;