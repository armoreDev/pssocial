import { Schema , model } from "mongoose";

const postSchema = Schema({
    userId:{
        type:String,
        require:true
    },
    firstName:{
        type:String,
        require:true
    },
    lastName:{
        type:String,
        require:true
    },
    location:String,
    discription:String,
    picturePath:String,
    userPicturePath:String,
    like:{
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
