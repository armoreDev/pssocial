import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        min:2,
        max:50,

    },
    lastName:{
        type:String,
        required:true,
        min:2,
        max:50,

    },
    email:{
        type:String,
        required:true,
        // unique:true,
        max:50,
        
    },
    password:{
        type:String,
        min:5,

    },	
    friends:{
        type:Array,
        default:[],
    },
    picturePath:{
        type:String,
        default:"",
    },
    location:{
        type:String,
        default:"",
    },
	occupation:String,
    viewedProfile:Number,
	impressions:Number
},
{timestamps:true}
);
const User = new mongoose.model("User",UserSchema);
export default User;
