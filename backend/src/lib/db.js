import mongoose from "mongoose"
import dotenv from 'dotenv'
dotenv.config()
const ConnectDB = async() =>{
           try {
            const conn = await mongoose.connect(process.env.MONGO_URI)
            console.log("Database Connected succesfully" , conn.connection.host)
           } catch (error) {
            console.error("Error connection to DATABASE" , error)
            process.exit(1); //1 status means fail , 0 means success
           } 
}

export default ConnectDB;