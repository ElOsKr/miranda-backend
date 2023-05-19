import mongoose from "mongoose";
const { Schema } = mongoose;
import { UserType } from '@src/@types/userType'

export const userSchema = new Schema<UserType>({
    id: {type: String, unique: true},
    name: String,
    password: String,
    photo: String,
    email: String,
    contact: Number,
    description: String,
    status: Boolean
})

export const userModel = mongoose.model('Users', userSchema)