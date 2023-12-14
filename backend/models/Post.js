import { Schema , model } from "mongoose";

const postSchema = Schema({
    userId:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    location:String,
    description:String,
    picturePath:String,
    userPicturePath:String,
    likes:{
        type:Map,
        of:Boolean,
    },
    comments:{
        type:Array,
        default:[]
    }
},
{
    timestamp:true
});

const Post = model("Post",postSchema);
export default Post;
