const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const { createBlog, getAllBlogs, getBlog, getEditBlogForm, updateBlog, deleteBlog } = require('../controllers/blogs');

const router = express.Router();

router.get('/', getAllBlogs);

router.get('/create', requireAuth, (req, res) => res.render('create_blog', { error: null }));

router.post('/', requireAuth, createBlog);

router.get('/:slug', getBlog);
router.get('/:slug/edit', requireAuth, getEditBlogForm);
router.post('/:slug/edit', requireAuth, updateBlog);
router.post('/:slug/delete', requireAuth, deleteBlog);

module.exports = router;
