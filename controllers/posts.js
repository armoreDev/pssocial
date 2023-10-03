import Post from "../models/Post.js";
import User from "../models/User.js";


export const createPost = async (req, res) => {
    try {
        const { userId, description } = req.body;
        const { path } = req.file;
        const user = await User.findById(userId);
        const { firstName, lastName, location } = user;
        const userPicturePath = user.picturePath;

        const newPost = new Post({
            userId,
            firstName,
            lastName,
            location,
            picturePath: path,
            userPicturePath,
            description,
            likes: {},
            comments: []
        })
        const post = await newPost.save();
        return res.status(201).json(post);

    } catch (err) {
        res.status(409).json({ massage: err.massage });
    };
};

export const getFeedPosts = async (req, res) => {
    console.log('get feed post controllers');
    try {
        const post = await Post.find();
        res.status(200).json(post);
    } catch (error) {
        res.status(409).json({ massage: err.massage });
    }
}
export const getUserPosts = async (req, res) => {
    try {
        console.log('get user post controllers');
        const { userId } = req.params;
        const posts = await Post.find({ userId });
        res.status(200).json({ posts });

    } catch (error) {
        res.status(409).json({ massage: error.massage });
    }
};
export const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        const isLike = post.like.get(userId);
        if (isLike) {
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        }
        const updatePost = await Post.findByIdAndUpdate(
            id,
            { likes : post.likes}
        );
        res.status(200).json(updatePost);

    } catch (error) {
        res.status(409).json({ massage: error.massage });
    }
};

