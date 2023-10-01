import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

//  REGISTER USER
export const register = async (req , res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            freinds,
            picturePath,
            location,
            occupation,

        } = req.body;
        const file = req.file;
        file.filename=`${Date.now()}${file.originalname}`
        console.log(file);
        
        //gen Salt
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password,salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password:passwordHash,
            freinds,
            picturePath:file.filename,
            location,
            occupation,
            viewedProfile:Math.floor(Math.random()*100000),
            impressions:Math.floor(Math.random()*100000),
        })
        const saveUser = await newUser.save();
        res.status(201).json(saveUser);

    } catch (err) {
        res.status(500).json({ error:err.massage })
    }
};

export const login = async ( req , res ) => {
    try {
        const { email, password} = req.body;
        const user = await User.findOne({ email : email });
        if(!user){
            res.staus(400).json({ msg: "User do not exist"});
        };
        const userCopy = { ...user }
        console.log(userCopy);
        
        const isMatch = await bcrypt.compare( password , user.password );
        if(!isMatch){
            res.status(400).json({ msg : "Password invalid"})
        }
        
        const token = jwt.sign({ id : userCopy._id } , process.env.JWT_SECRET);
        delete userCopy.password;
        console.log(userCopy);
        
        res.status(200).json({ token , user });
        
    } catch (error) {
        res.status(500).json({err:error});
    };
};
