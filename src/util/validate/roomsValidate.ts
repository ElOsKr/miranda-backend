import { RoomType } from '@src/@types/roomType';
import joi from 'joi';

export const roomSchema = joi.object<RoomType>({
    room_id: joi.string().guid({version: 'uuidv4'}),
    room_number: joi.number().min(0),
    room_photo: joi.string().uri(),
    room_type: joi.string().valid("double bed","single","duplex"),
    room_amenities: joi.string(),
    room_price: joi.number(),
    room_offer: joi.number().min(0).max(99),
    room_status: joi.boolean()
})