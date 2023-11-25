import mongoose from "mongoose";
const userSchema=mongoose.Schema({
    username:{
       type:String,
       lowercase:true
    },phoneNumber:{
        type:String,
        unique:true,
        maxlength:15
    },
    balance:{
        type:Number,
        default:0
    },
    premium:{
     type:Boolean,
     default:false
    },
    xp:{
        type:Number,
        default:0
    },
    numRefs:{
        type:Number,
        default:0
    },
    badgeIds: {
        type: [
            { badgeId: Number, badgeLevel: Number },
        ],
        default: [{badgeId:-1,badgeLevel: 0}]
    },
    fitnessXP:{
        type:Number,
        default:0
    },
    knowledgeXP:{
        type:Number,
        default:0
    },
    authToken:{
     type:String,
     default:""   
    }
})
const User = mongoose.model("User", userSchema, "users")

export default User
                           