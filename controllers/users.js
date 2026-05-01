const User = require('../models/users');
const { signToken } = require('detexter-auth-kit');

// Prevent mass assignment; handle duplicate key; redirect on success
const createUserHandler = async (req, res, next) => {
    try {
        const { username, firstName, lastName, gender, email, password } = req.body;
        await User.create({ username, firstName, lastName, gender, email, password });
        res.redirect('/user/login');
    } catch (err) {
        if (err.code === 11000) {
            const field = Object.keys(err.keyValue || {})[0] || 'field';
            return res.render('signup', {
                error: `An account with that ${field} already exists. Please use a different one.`,
            });
        }
        next(err);
    }
};

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.render('login', { error: 'Invalid email or password' });
        }

        const isMatch = user.verifyPassword(password);

        if (!isMatch) {
            return res.render('login', { error: 'Invalid email or password' });
        }

        const token = signToken(
            {
                id: user.id,
                username: user.username,
                email: user.email,
                name: user.name,
            },
            { secret: process.env.JWT_SECRET }
        );

        res.cookie('token', token).redirect('/');
    } catch (err) {
        next(err);
    }
};

const logoutUser = (req, res) => {
    res.clearCookie('token').redirect('/');
};

const getAllUsers = async (req, res, next) => {
    try {
        const allUsers = await User.find({});
        res.json({ message: `${allUsers.length} users found`, Users: allUsers });
    } catch (err) {
        next(err);
    }
};

const getUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.json(user);
    } catch (err) {
        next(err);
    }
};

const updateUser = async (req, res, next) => {
    try {
        const id = req.user.id;
        if (!id) {
            return next(new Error('id is required'));
        }

        const { email, username, lastName } = req.body;
        const updateData = {};

        if (username && username.trim() !== '') {
            updateData.username = username;
        }

        if (lastName && lastName.trim() !== '') {
            updateData.lastName = lastName;
        }

        if (email && email.trim() !== '') {
            updateData.email = email;
        }

        if (req.file?.location) {
            updateData.profilePicture = req.file.location;
        }

        await User.findByIdAndUpdate(id, updateData);
        res.redirect('/');
    } catch (err) {
        next(err);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User deleted', user: deletedUser });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    createUserHandler,
    loginUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
    logoutUser,
};
