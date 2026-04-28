const Blog = require('../models/blogs');


const createBlog = async(req, res) => {
    if(!req.body){return res.json({message: "req.body is required"})};
    const blog = await Blog.create(req.body);
    res.json({message : `blog created : ${blog}`});
};

module.exports = {createBlog};