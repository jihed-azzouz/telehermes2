import express from "express"
import { updateTotalXp,updateFitnessXP,updateKnowledgeXP,updateBadges,authGoogle,getSteps } from "../controllers/rewardsController.js";
const router=express.Router();


router.put("/totalxp",updateTotalXp)
router.put("/fitnessxp",updateFitnessXP)
router.put("/knowledgexp",updateKnowledgeXP)
router.put("/badges",updateBadges)
router.get("/stepsAuth",authGoogle)
router.get("/steps",getSteps)
export default router
