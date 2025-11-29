import dotenv from "dotenv"
import  app  from "./app.js";
import connectDB from "./db/index.js";

dotenv.config({
    path: "./.env"
})

const PORT = process.env.PORT || 3000;

connectDB()
.then (() => {
  app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
  })
})
.catch((err) => {
  console.log("Mongodb connection error ", err)
})
