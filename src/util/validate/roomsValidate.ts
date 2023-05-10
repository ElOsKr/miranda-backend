import { RoomType } from '@src/@types/roomType';
import joi from 'joi';

export const roomSchema = joi.object<RoomType>({
    room_id: joi.string().guid({version: 'uuidv4'}).required(),
    room_number: joi.number().min(0).required(),
    room_photo: joi.string().uri().required(),
    room_type: joi.string().valid("double bed","single","duplex").required(),
    room_amenities: joi.string(),
    room_price: joi.number().required(),
    room_offer: joi.number().min(0).max(99),
    room_status: joi.boolean().required()
})