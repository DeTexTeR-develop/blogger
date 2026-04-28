const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: { 
        type: String,
        unique: true,
        required: true 
    },
    body: {
        type: String, 
        required: true 
    },
    slug: { 
        type: String, 
        required: true,
        unique: true,
    },
    author: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true,
    },
}, { timestamps: true });

blogSchema.pre("validate", async function () {
    if (!this.title) return;

    this.slug = this.title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-') + '-' + Date.now();
});


module.exports = mongoose.model("Blog", blogSchema);
