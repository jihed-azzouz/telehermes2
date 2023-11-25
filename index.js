import express from "express"
import * as dotenv from "dotenv"
import cors from "cors"
import connectDB from "./db/connect.js"
import authRoutes from "./routes/authRoutes.js"
import rewardsRoutes from "./routes/rewardsRoutes.js"
import userRoutes from "./routes/userRoutes.js"
dotenv.config()

const port = process.env.PORT

const app = express()
app.use(cors())
app.use(express.json())

//---------------------------------------------------------------------------------------    SIGNUP & LOGIN       -----------------------------------------------------------------------------------
app.use("/auth", authRoutes)
//---------------------------------------------------------------------------------------    CREATE&JOIN MATCH    --------------------------------------------------------------------------------
app.use("/api/rewards", rewardsRoutes)
app.use("/api/users",userRoutes)
//----------------------------------------------------------------------------------------  Testing APIS-----------------------------------------------------------------------------------



const startServer = async () => {
  try {
    connectDB(process.env.ATLAS_URI)
    app.listen(port, () => console.log(`server has started on port ${port}`))
  } catch (e) {
    console.log(e)
  }
}
startServer()
