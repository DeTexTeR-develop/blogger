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
        return res.status(401).json({ message: "Invalid email or password" });
    };

    const token = signToken({
        id: user.id,
        email: user.email,
    },{secret : process.env.JWT_SECRET} );

    res.json({ message: "Login successful" , token});
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
    const id = req.params.id;
    if(!id){
        throw new Error(err, "id is required");
    };
    const {email, username, lastName} = req.body;
    console.log(email);
    if(!email){
        throw new Error(err, "content required to update");
    }
    const updatedUser = await User.findByIdAndUpdate(id, {email, username, lastName});
    console.log(updatedUser);
    res.json({message: "User updated", user: updatedUser});
};

const deleteUser = async(req, res) => {
    const {id} = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    res.json("User Deleted: ",deletedUser);
};


module.exports = {createUserHandler, loginUser, getAllUsers, getUser, updateUser, deleteUser};