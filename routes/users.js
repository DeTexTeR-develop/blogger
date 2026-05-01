const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const {
    createUserHandler,
    loginUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
    logoutUser,
} = require('../controllers/users');

const router = express.Router();

// Auth pages
router.get('/sign-up', (req, res) => res.render('signup', { error: null }));
router.post('/sign-up', createUserHandler);

router.get('/login', (req, res) => res.render('login', { error: null }));
router.post('/login', loginUser);

router.get('/logout', logoutUser);

// Protected user routes — requireAuth redirects to /user/login instead of showing "invalid token"
router.get('/edit-user', requireAuth, (req, res) => res.render('edit_user', { user: req.user }));
router.post('/update-user', requireAuth, updateUser);

router.get('/get-all-users', requireAuth, getAllUsers);
router.get('/get-user/:id', requireAuth, getUser);
router.delete('/delete-user/:id', requireAuth, deleteUser);

module.exports = router;
