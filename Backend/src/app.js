import express from 'express';
import connectDB from './config/db.js';
import cors from 'cors';
const app = express();
const PORT = process.env.PORT || 3001;
import authRoute from './routes/UserRoutes.js';
import cookieParser from 'cookie-parser';
import dotenv from "dotenv"
import path from "path"

dotenv.config()
 
const __dirname = path.resolve()

if (process.env.NODE_ENV !== "production") {
    app.use(cors({
        origin:"http://localhost:5176",
        credentials:true
    }));
}

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRoute);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../Frontend/dist")))
    
    app.get(/.*/, (req,res) => {
        res.sendFile(path.join(__dirname, "../Frontend", "dist","index.html"))
    })
}


app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    await connectDB();
});