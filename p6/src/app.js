import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();


app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true
    })
);

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}) )
app.use(express.static("public"))
app.use(cookieParser())
  


// 🔹 Basic test route
app.get("/", (req, res) => {
  res.send("🚀 Server is up and running!");
});



export default app; // ✅ default export
