import Post from "../models/Post.js";
import User from "../models/User.js";


export const createPost = async (req, res) => {
    try {
        const { userId, description } = req.body;
        const { path} = req.file;
        const user = await User.findById(userId);
        const { firstName , lastName , location } = user ;
        const userPicturePath = user.picturePath;
        
        const newPost = new Post({
            userId,
            firstName,
            lastName,
            location,
            picturePath:path,
            userPicturePath,
            description,
            like:{},
            comments:[]
        })
        const post = await newPost.save();
        return res.status(201).json(post);

    } catch (err) {
        res.status(409).json({ massage: err.massage })
    }
}
export const getFeedPosts = (req, res) => {
    console.log('get feed post controllers');
}
export const getUserPosts = (req, res) => {
    console.log('get user post controllers');
}
export const likePost = (req, res) => {
    console.log('get like post controllers');
}

