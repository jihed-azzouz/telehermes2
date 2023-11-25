import User from "../db/models/user.js";
import {badges} from"../constants.js";
import { google } from "googleapis";
import  request  from "request";
import { response } from "express";

export const authGoogle=async(req,res)=>{
    const oauth2Client=new google.auth.OAuth2(
        "1085630869067-l4fnd7evobqb9ktuo7pqmkn38uckqff0.apps.googleusercontent.com",
        "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",
        "https://localhost:8080/steps"
    );
    const scope=[
        "https://www.googleapis.com/auth/fitness.activity.read profile email openid"
    ];
    const url=oauth2Client.generateAuthUrl({
        access_type:"offline",
        scope:scopes,
        state:JSON.stringify({
            callbackUrl:req.body.callbackUrl,
            userID:req.body.userid
        })
    });
    request(url,(err,response,body)=>{
        console.log("error: ",err);
        console.log("statusCode: ",response&&response.statusCode);
        res.send({url});
    })
}

export const updateTotalXp = async (req, res) => {
    try {
        let { username, xpCount } = req.body;
        const user = await User.findOne({ username: username });
        user.xp = user.xp + xpCount;
        const xpBadge = user.badgeIds.find(badge => badge.badgeId === 0);
        if (xpBadge) {
            badges[0].milestone.forEach(level => {
                if (user.xp >= level) {
                    xpBadge.badgeLevel++;
                }
            });
        } else {
            const firstSurpassedMilestone = badges[0].milestone.find(level => user.xp >= level);

            if (firstSurpassedMilestone) {
                const badgeLevel = badges[0].milestone.indexOf(firstSurpassedMilestone) + 1;
                user.badgeIds.push({ badgeId: 0, badgeLevel });
            }
        }
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(403).json({ msg: error.message });
    }
};


export const updateFitnessXP=async(req,res)=>{
    try {
        let {username,fitnessXpAPI}=req.query
        const user=await User.findOne({username:username});
        user.fitnessXP=user.fitnessXP+fitnessXpAPI;
        const fitenssBadge=user.badgeIds.find(badge=>badge.badgeId===1)
        if (fitenssBadge){
            badges[1].milestone.forEach(level=>{
                if(user.fitnessXP>=level){
                    fitenssBadge.badgeLevel++;
                }
            })
        }else {
            const firstSurpassedMilestone = badges[1].milestone.find(level => user.fitnessXP >= level);

            if (firstSurpassedMilestone) {
                const badgeLevel = badges[1].milestone.indexOf(firstSurpassedMilestone) + 1;
                user.badgeIds.push({ badgeId: 1, badgeLevel });
            }
        }
        await user.save()
        res.status(201).json(user)
    } catch (error) {
        res.status(403).json({msg:error.message})
    }
}
export const updateKnowledgeXP=async(req,res)=>{
    try {
        let {username,knowledgeXpEarned}=req.query
        const user=await User.findOne({username:username});
        user.knowledgeXP=user.knowledgeXP+knowledgeXpEarned;
        const knowledgeBadge=user.badgeIds.find(badge=>badge.badgeId===2)
        if (knowledgeBadge){
            badges[2].milestone.forEach(level=>{
                if(user.knowledgeXP>=level){
                    knowledgeBadge.badgeLevel++;
                }
            })
        }else {
            const firstSurpassedMilestone = badges[2].milestone.find(level => user.knowledgeXP >= level);

            if (firstSurpassedMilestone) {
                const badgeLevel = badges[2].milestone.indexOf(firstSurpassedMilestone) + 1;
                user.badgeIds.push({ badgeId: 2, badgeLevel });
            }
        }
        await user.save()
        res.status(201).json(user)
    } catch (error) {
        res.status(403).json({msg:error.message})
    }
}
export const updateBadges=async(req,res)=>{
    try {
        let {username,badgeID}=req.query
        const user=await User.findOne({username:username});
        user.fitnessXP=user.fitnessXP+fitnessXpAPI;
        await user.save()
        res.status(201).json(user)
    } catch (error) {
        res.status(403).json({msg:error.message})
    }
}
export const getSteps=async(req,res)=>{
    try {
        
    } catch (error) {
        res.status(403).json({msg:error.message})
    }
}


