import { BookingsType } from "@src/@types/bookingsType";
import joi from 'joi';

export const bookingSchema = joi.object<BookingsType>({
    id: joi.string().guid({version: 'uuidv4'}),
    guest: joi.string(),
    photo: joi.string().uri(),
    orderDate: joi.date(),
    checkin: joi.date(),
    checkout: joi.date(),
    room_Id: joi.string().guid({version: 'uuidv4'}),
    price: joi.number().min(0),
    amenities: joi.array().items(joi.string()),
    specialRequest: joi.string(),
    description: joi.string(),
    status: joi.string().valid("checkIn","checkOut","inProgress")
})