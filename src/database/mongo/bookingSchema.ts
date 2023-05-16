import mongoose from "mongoose";
const { Schema } = mongoose;
import { BookingsType } from '@src/@types/bookingsType'

export const contactSchema = new Schema<BookingsType>({
    id: {type: String, unique: true},
    photo: String,
    guest: String,
    orderDate: Date,
    checkin: Date,
    checkout: Date,
    room_Id: {type: String,ref: 'Rooms'},
    price: Number,
    amenities: [{type: String}],
    specialRequest: String,
    description: String,
    status: String
})