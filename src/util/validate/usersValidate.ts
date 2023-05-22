import { UserType } from "@src/@types/userType";
import joi from 'joi';

export const userSchema = joi.object<UserType>({
    id: joi.string().guid({version: 'uuidv4'}),
    name: joi.string(),
    password: joi.string(),
    photo: joi.string().uri(),
    email: joi.string().email(),
    joined: joi.date(),
    description: joi.string(),
    contact: joi.number(),
    status: joi.boolean()
})