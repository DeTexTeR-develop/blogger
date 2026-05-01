const express = require('express');
const {authMiddleware}= require('detexter-auth-kit');
const {createUserHandler, loginUser, getAllUsers, getUser, updateUser, deleteUser, logoutUser} = require('../controllers/users');

const router = express.Router();

router.post("/sign-up", createUserHandler);
router.get('/sign-up', (req, res) => {
    res.render('signup');
});

router.post("/login", loginUser);
router.get("/login", (req, res) => {
    res.render('login');
}) ;
router.get("/edit-user", (req, res ) => {res.render('edit_user')})
router.get("/logout", logoutUser)
router.get("/get-all-users", authMiddleware({secret: process.env.JWT_SECRET}), getAllUsers);
router.get("/get-user/:id", authMiddleware({secret: process.env.JWT_SECRET}), getUser);
router.post("/update-user", authMiddleware({secret: process.env.JWT_SECRET}), updateUser);
router.delete("/delete-user/:id", authMiddleware, deleteUser);

module.exports = router;