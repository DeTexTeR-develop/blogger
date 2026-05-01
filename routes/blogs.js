const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const { createBlog, getAllBlogs, getBlog } = require('../controllers/blogs');

const router = express.Router();

// Static routes must come before /:slug to avoid being swallowed by the param
router.get('/', getAllBlogs);
router.get('/create', requireAuth, (req, res) => res.render('blogs', { error: null }));
router.post('/', requireAuth, createBlog);

// Dynamic route last
router.get('/:slug', getBlog);

module.exports = router;
