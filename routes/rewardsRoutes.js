import express from "express"
import { updateTotalXp,updateFitnessXP,updateKnowledgeXP,updateBadges } from "../controllers/rewardsController.js";
const router=express.Router();


router.put("/totalxp",updateTotalXp)
router.put("/fitnessxp",updateFitnessXP)
router.put("/knowledgexp",updateKnowledgeXP)
router.put("/badges",updateBadges)

export default router
