const Blog = require('../models/blogs');

const getAllBlogs = async (req, res, next) => {
    try {
        const blogs = await Blog.find({}).sort({ createdAt: -1 }).populate('author', 'username firstName lastName');
        res.render('blogs', { blogs });
    } catch (err) {
        next(err);
    }
};

const getBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug }).populate('author', 'username firstName lastName');
        if (!blog) {
            return res.status(404).render('404', { error: 'Blog not found' });
        }
        res.render('blog', { blog });
    } catch (err) {
        next(err);
    }
};

const createBlog = async (req, res, next) => {
    try {
        if (!req.body) {
            return res.render('blogs/create', { error: 'Request body is required' });
        }

        const { title, body } = req.body;

        if (!title || !title.trim()) {
            return res.render('blogs/create', { error: 'Title is required' });
        }
        if (!body || !body.trim()) {
            return res.render('blogs/create', { error: 'Body is required' });
        }

        const blog = await Blog.create({
            title,
            body,
            author: req.user.id,
            coverImage: req.file?.location ?? null,
        });

        res.redirect(`/blogs/${blog.slug}`);
    } catch (err) {
        next(err);
    }
};

module.exports = { createBlog, getAllBlogs, getBlog };
