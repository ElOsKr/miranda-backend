import mongoose from "mongoose";
const { Schema } = mongoose;
import { RoomType } from '@src/@types/roomType'

export const roomSchema = new Schema<RoomType>({
    id: {type: String, unique: true},
    number: Number,
    photo: String,
    type: String,
    amenities: [{type: String}],
    price: Number,
    offer: Number,
    status: Boolean
})