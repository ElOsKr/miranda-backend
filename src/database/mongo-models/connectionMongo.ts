import mongoose from "mongoose";

export const connect = async (): Promise<void> => {
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/mirandahotel');
    
        console.log('Connected');
      } catch (error){
        console.log(`Mongo connection error: ${error}`);
      }
}

export const disconnect = async (): Promise<void> => {
    await mongoose.disconnect();
    console.log("succesfull disconnection");
}