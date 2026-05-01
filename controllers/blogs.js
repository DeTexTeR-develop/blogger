const Blog = require('../models/blogs');


const createBlog = async(req, res) => {
    if(!req.body){return res.json({message: "req.body is required"})};
    const blog = await Blog.create({...req.body, author: req.user.id}); 
    res.json({message : `blog created : ${blog}`});
};

const getAllBlogs = async (req, res ) => {
    const blogs = await Blog.find({});
    res.json({messge: `${blogs.length} blogs found: ${blogs}`})
}
module.exports = {createBlog, getAllBlogs};