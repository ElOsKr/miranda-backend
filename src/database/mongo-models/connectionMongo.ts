import mongoose from "mongoose";
import 'dotenv/config';
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_KEY}@cluster0.xqmwsv7.mongodb.net/?retryWrites=true&w=majority`


export const connect = async (): Promise<void> => {
    try{
        await mongoose.connect(uri);
    
        console.log('Connected');
      } catch (error){
        console.log(`Mongo connection error: ${error}`);
      }
}

export const disconnect = async (): Promise<void> => {
    await mongoose.disconnect();
    console.log("succesfull disconnection");
}