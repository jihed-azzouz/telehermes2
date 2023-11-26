import User from "../db/models/user.js";

export const signup = async (req, res) => {
    try {
      let { username, phoneNumber} = req.body
      const newUser = new User({
        username:username,
        phoneNumber:phoneNumber,
         balance:0,
         premium:false,
         xp:0,
         numRefs:0,
         badgesIds: {
                 badgeId: -1, 
                 badgeLevel: 0 },
         fitnessXP:0,
         knowledgeXP:0
      })
      const savedUser = await newUser.save()
      res.status(201).json(savedUser)
    } catch (err) {
      if (err.code === 11000) {
        res.status(400).json({ msg:err.message })
      }
      else res.json({msg:err.message})
      
    }
  }
export const login = async(req,res)=>{
    try {
        let {username,phoneNumber}=req.body;
        const user=await User.findOne({username:username});
        if (!user) return res.status(401).json({msg:"Account don't exist"})
        if (user.phoneNumber !== phoneNumber) return res.status(401).json({ msg: "Phone Number incorrect" })

    res.status(200).json({user})
    } catch (error) {
        res.status(401).json({msg:error.message})
    }
}