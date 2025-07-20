import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const connectDB=async()=>{
    try {
        await mongoose.connect(`mongodb+srv://adebolaelisha:adebola12345@cluster0.xxsg0nk.mongodb.net/notes-app?retryWrites=true&w=majority&appName=Cluster0` || process.env.MONGODB_URI);
        console.log("Mongoose Connected!!!");
        
    } catch (error) {
        console.log("Connection Failed",error);
        process.exit(1);
        
    }
}
export default connectDB;