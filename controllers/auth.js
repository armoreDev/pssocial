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
        res.status(500).json({error:err})
    }
};

export const login = async ( req , res ) => {
    try {
        const {
            email,
            password
        } = req.body
        console.log({email,password});
    } catch (error) {
        res.status(500).json({error:err})
    }
};
