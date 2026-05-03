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
            return res.status(404).send('Blog not found');
        }
        res.render('blog', { blog });
    } catch (err) {
        next(err);
    }
};

const createBlog = async (req, res, next) => {
    try {
        const { title, body } = req.body;

        if (!title || !title.trim()) {
            return res.render('create_blog', { error: 'Title is required' });
        }
        if (!body || !body.trim()) {
            return res.render('create_blog', { error: 'Body is required' });
        }

        const blog = await Blog.create({
            title,
            body,
            author: req.user.id,
        });

        res.redirect(`/blogs/${blog.slug}`);
    } catch (err) {
        next(err);
    }
};

const getEditBlogForm = async (req, res, next) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug });
        if (!blog) {
            return res.status(404).send('Blog not found');
        }

        if (blog.author.toString() !== req.user.id) {
            return res.status(403).send('Forbidden');
        }

        res.render('edit_blog', { blog, error: null });
    } catch (err) {
        next(err);
    }
};

const updateBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug });
        if (!blog) {
            return res.status(404).send('Blog not found');
        }

        if (blog.author.toString() !== req.user.id) {
            return res.status(403).send('Forbidden');
        }

        const { title, body } = req.body;

        if (!title || !title.trim()) {
            return res.render('edit_blog', { blog, error: 'Title is required' });
        }
        if (!body || !body.trim()) {
            return res.render('edit_blog', { blog, error: 'Body is required' });
        }

        blog.title = title;
        blog.body = body;
        await blog.save();

        res.redirect(`/blogs/${blog.slug}`);
    } catch (err) {
        next(err);
    }
};

const deleteBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug });
        if (!blog) {
            return res.status(404).send('Blog not found');
        }

        if (blog.author.toString() !== req.user.id) {
            return res.status(403).send('Forbidden');
        }

        await Blog.findByIdAndDelete(blog._id);
        res.redirect('/blogs');
    } catch (err) {
        next(err);
    }
};

module.exports = { createBlog, getAllBlogs, getBlog, getEditBlogForm, updateBlog, deleteBlog };
