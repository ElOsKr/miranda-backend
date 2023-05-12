import { BookingsType } from "@src/@types/bookingsType";
import joi from 'joi';

export const bookingSchema = joi.object<BookingsType>({
    booking_id: joi.string().guid({version: 'uuidv4'}),
    booking_guest: joi.string(),
    booking_photo: joi.string().uri(),
    booking_orderDate: joi.date(),
    booking_checkin: joi.date(),
    booking_checkout: joi.date(),
    room_Id: joi.string().guid({version: 'uuidv4'}),
    booking_price: joi.number().min(0),
    booking_amenities: joi.string(),
    booking_specialRequest: joi.string(),
    booking_description: joi.string(),
    booking_status: joi.string().valid("checkIn","checkOut","inProgress")
})