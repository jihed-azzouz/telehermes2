import mongoose from "mongoose"

const connectDB = async (url) => {
  mongoose.set("strictQuery", true)
  await mongoose
    .connect(url)
    .then(() => console.log("db connected"))
    .catch((e) => console.log(e))
}
export default connectDB
