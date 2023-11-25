import User from "../db/models/user.js";

export const getUserData=async(req,res)=>{
    try {
        const {username}=req.body;
        const user=await User.findOne({username:username}) 
        const userData={
            username:user.username,
            balance:user.balance,
            premium:user.premium,
            xp:user.xp,
            badgesIds:user.badgesIds,
            fitnessXP:user.fitnessXP,
            knowledgeXP:user.knowledgeXP
        }
        res.json(userData)
    } catch (error) {
        res.status(403).json({msg:error.message})
    }
}

