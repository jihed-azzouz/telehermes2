import User from "../db/models/user.js";
import {badges} from"../constants.js";
import { google } from "googleapis";
import  request  from "request";
import { response } from "express";
import urlParse from "url-parse"
import queryParse from "query-string"
import axios from "axios";

const getStartAndEndTimes = () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    return {
        startTimeMillis: yesterday.getTime(),
        endTimeMillis: today.getTime()
    };
};
const oauth2Client = new google.auth.OAuth2(
    "1085630869067-l4fnd7evobqb9ktuo7pqmkn38uckqff0.apps.googleusercontent.com",
    "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",
    "http://localhost:8080/api/rewards/steps"
);


export const authGoogle = async (req, res) => {
    const username = req.query.username; // or req.body.username, depending on your request type
    const user = await User.findOne({ username: username });

    if (!user) {
        return res.status(404).send('User not found');
    }

    if (user.authToken) {
        // User already has a token
        return res.send({ token: user.authToken });
    } else {
        const scopes = [
            "https://www.googleapis.com/auth/fitness.activity.read",
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
            "openid"
          ];
          const statePayload = {
            callbackUrl: req.body.callbackUrl,
            userID: req.body.userid,
            username: req.query.username // Include the username in the state
        };
        const url=oauth2Client.generateAuthUrl({
            access_type:"offline",
            scope:scopes,
            state: JSON.stringify(statePayload)
        });
        request(url,(err,response,body)=>{
            console.log("error: ",err);
            console.log("statusCode: ",response&&response.statusCode);
            res.send({url});
        })
    }
};
export const getSteps = async (req, res) => {
    const { startTimeMillis, endTimeMillis } = getStartAndEndTimes();
    const queryURL = new urlParse(req.url);
    const code = queryParse.parse(queryURL.query).code;
    const state = JSON.parse(queryParse.parse(queryURL.query).state); // Parse the state parameter
    const username = state.username;
    const user = await User.findOne({ username: username });

    if (!user) {
        return res.status(404).send('User not found');
    }

    // If it's a new token, save it
    const tokens = await oauth2Client.getToken(code);
    if (tokens.tokens.access_token !== user.authToken) {
        user.authToken = tokens.tokens.access_token;
        await user.save();
    }
    
    try {
        const result = await axios({
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + tokens.tokens.access_token,
                'Content-Type': 'application/json'
            },
            url: `https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate`,
            data: {
                aggregateBy: [{ dataTypeName: "com.google.step_count.delta" }],
                bucketByTime: { "durationMillis": 86400000 },
                startTimeMillis: startTimeMillis,
                endTimeMillis: endTimeMillis
            },
        });

        let totalSteps = 0;
        if (result.data && result.data.bucket) {
            for (const bucket of result.data.bucket) {
                for (const dataSet of bucket.dataset) {
                    for (const point of dataSet.point) {
                        for (const value of point.value) {
                            totalSteps += value.intVal || 0;
                        }
                    }
                }
            }
        }
        console.log("Total Steps: ", totalSteps);
        res.send({ totalSteps });

    } catch (error) {
        console.error("Error details:", error.response ? error.response.data.error : error);
        res.status(500).send("An error occurred while fetching step data.");
    }
};
// export const getSteps=async(req,res)=>{
//     const { startTimeMillis, endTimeMillis } = getStartAndEndTimes();
//     const queryURL=new urlParse(req.url);
//     const code=queryParse.parse(queryURL.query).code;
//     const oauth2Client=new google.auth.OAuth2(
//         "1085630869067-l4fnd7evobqb9ktuo7pqmkn38uckqff0.apps.googleusercontent.com",
//         "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",
//         "http://localhost:8080/api/rewards/steps"
//     );
//     const tokens=await oauth2Client.getToken(code);
//     let stepArray=[];
//     try {
//         const result = await axios({
//             method:"POST",
//             headers: {
//                 'Authorization': 'Bearer ' + tokens.tokens.access_token,
//                 'Content-Type': 'application/json'
//             },
//             "Content-Type":"application/json",
//             url:`https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate`,
//         data: {
//             aggregateBy: [{ dataTypeName: "com.google.step_count.delta" }],
//             bucketByTime: { "durationMillis": 86400000 },
//             startTimeMillis: 1438705622000,
//             endTimeMillis: 1439310422000
//         },
//     });  
//             res.send("HELLOW")
//     console.log(result)  
//     stepArray=result.data.bucket    
//     } catch (error) {
//         console.log("Error details:", error.response.data.error);
//     }
//     try {
//         for (const dataSet of stepArray)
//          for (const points of dataSet.dataset)
//           for (const steps of points.point){
//         console.log(steps.value)
//     }
        
//     } catch (error) {
//         console.log("Error details:", error.response.data.error);
//     }
// }
export const updateTotalXp = async (req, res) => {
    try {
        let { username, xpCount } = req.body;
        const user = await User.findOne({ username: username });
        user.xp = user.xp + xpCount;
        const xpBadge = user.badgeIds.find(badge => badge.badgeId === 0);
        if (xpBadge) {
            xpBadge.badgeLevel=0;
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
        let {username,fitnessXpAPI}=req.body
        const user=await User.findOne({username:username});
        user.fitnessXP=user.fitnessXP+fitnessXpAPI;
        const fitenssBadge=user.badgeIds.find(badge=>badge.badgeId===1)
        if (fitenssBadge){
            fitenssBadge.badgeLevel=0
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
        let {username,knowledgeXpEarned}=req.body
        const user=await User.findOne({username:username});
        user.knowledgeXP=user.knowledgeXP+knowledgeXpEarned;
        const knowledgeBadge=user.badgeIds.find(badge=>badge.badgeId===2)
        if (knowledgeBadge){
            knowledgeBadge.badgeLevel=0
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



