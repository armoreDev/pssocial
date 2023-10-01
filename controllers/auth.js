import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { token } from "morgan";

//  REGISTER USER
export const register = async (req, res) => {
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


        //gen Salt
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            freinds,
            picturePath: file.filename,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 100000),
            impressions: Math.floor(Math.random() * 100000),
        })
        const saveUser = await newUser.save();
        res.status(201).json(saveUser);

    } catch (err) {
        res.status(500).json({ error: err.massage })
    };
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email });
        // Validate if user do not exist
        if (!user) {
            return res.status(400).json({ massage: " User do not exist " });
        };
        const isMatch = await bcrypt.compare(password, user.password);

        // Check is  match ? 
        if (!isMatch) {
            return res.status(400).json({ massage: " Password is Invalid" });
        }

        const token = jwt.sign({ id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d", algorithm: "HS256" }
        );
        delete user.password;
        return res.status(200).json({
            token,
            user
        });

    } catch (err) {
        res.status(500).json({ error: err });
    };
}
