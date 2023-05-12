import { UserType } from "@src/@types/userType";
import joi from 'joi';

export const userSchema = joi.object<UserType>({
    user_id: joi.string().guid({version: 'uuidv4'}),
    user_name: joi.string(),
    user_password: joi.string(),
    user_photo: joi.string().uri(),
    user_email: joi.string().email(),
    user_description: joi.string(),
    user_contact: joi.number(),
    user_status: joi.boolean()
})