const User = require('../models/users');
const { authMiddleware, signToken } = require("detexter-auth-kit");

const createUserHandler = async(req , res) => {
    const user = await User.create(req.body);
    res.json(user);
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
    };
    const isMatch = user.verifyPassword(password);

    if (!isMatch) {
        return res.status(401).render("login", { error: "Invalid email or password" });
    };

    const token = signToken({
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
    },{secret : process.env.JWT_SECRET} );

    res.cookie("token", token).redirect("/blogs");
};

const logoutUser = (req,res ) => {
    res.clearCookie("token").redirect("/blogs");
};

const getAllUsers = async(req, res) => {
    const allUsers = await User.find({});
    res.json({message: `${allUsers.length} users found`, Users: allUsers});
};

const getUser = async( req, res) => {
    const {id} = req.params;
    const user = await User.findById(id);
    
    res.json(user);
};

const updateUser = async(req, res) =>{
    const id = req.user.id;
    if(!id){
        throw new Error(err, "id is required");
    };
    const {email, username, lastName} = req.body;
    const updateData = {};

    if (username && username.trim() !== "") {
        updateData.username = username;
    };

    if (lastName && lastName.trim() !== "") {
        updateData.lastname = lastname;
    }

    if (email && email.trim() !== "") {
        updateData.email = email;
    }

    await User.findByIdAndUpdate(req.user._id, updateData);

    res.redirect("/blogs");
};

const deleteUser = async(req, res) => {
    const {id} = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    res.json("User Deleted: ",deletedUser);
};


module.exports = {createUserHandler, loginUser, getAllUsers, getUser, updateUser, deleteUser, logoutUser};