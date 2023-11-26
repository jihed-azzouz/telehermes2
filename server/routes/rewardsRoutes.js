import express from "express"
import { updateTotalXp,updateFitnessXP,updateKnowledgeXP,updateBadges,authGoogle,getSteps, updateQuizz,getFitnessXP,getKnowledgeXP } from "../controllers/rewardsController.js";
const router=express.Router();


router.put("/fitnessxp",updateFitnessXP)
router.put("/save-quiz-score",updateKnowledgeXP)
router.put("/badges",updateBadges)
router.get("/getQuiz",updateQuizz)
router.get("/stepsAuth",authGoogle)
router.get("/steps",getSteps)
router.get("/fit",getFitnessXP)
router.get("/knowledge",getKnowledgeXP)
export default router
