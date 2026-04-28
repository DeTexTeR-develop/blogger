
const express = require('express');
const {authMiddleware}= require('detexter-auth-kit');
const { createBlog } = require('../controllers/blogs');

const router = express.Router();

router.post("/", createBlog);

module.exports = router;