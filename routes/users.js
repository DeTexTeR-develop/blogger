const express = require('express');
const {authMiddleware}= require('detexter-auth-kit');
const {createUserHandler, loginUser, getAllUsers, getUser, updateUser, deleteUser} = require('../controllers/users');

const router = express.Router();

router.post("/sign-up", createUserHandler);
router.post("/login", loginUser);
router.get("/get-all-users", authMiddleware({secret: process.env.JWT_SECRET}), getAllUsers);
router.get("/get-user/:id", authMiddleware({secret: process.env.JWT_SECRET}), getUser);
router.patch("/update-user/:id", authMiddleware({secret: process.env.JWT_SECRET}), updateUser);
router.delete("/delete-user/:id", authMiddleware, deleteUser);

module.exports = router;