import { RoomType } from '@src/@types/roomType';
import joi from 'joi';

export const roomSchema = joi.object<RoomType>({
    id: joi.string().guid({version: 'uuidv4'}),
    number: joi.number().min(0),
    photo: joi.string().uri(),
    type: joi.string().valid("double bed","single","duplex"),
    amenities: joi.string(),
    price: joi.number(),
    offer: joi.number().min(0).max(99),
    status: joi.boolean()
})