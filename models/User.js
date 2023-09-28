import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    firstName:{
        type:String,
        require:true,
        min:2,
        max:50,

    },
    lastName:{
        type:String,
        require:true,
        min:2,
        max:50,

    },
    email:{
        type:String,
        require:true,
        max:50,
        unique:true
        
    },
    password:{
        type:String,
        min:5,

    }	
    freind:{
        type:Array,
        default:[],
    }
    picturePath:{
        type:String,
        default:"",
    },
    location:	String,
	occupation:	String,
    viewedProfile:	Number,
	impressions:	Number
},
{timestamps:true}
);
const User = new mongoose.model("User",UserSchema);
export default User;
