import { UserType } from "@src/@types/userType";
import joi from 'joi';

export const userSchema = joi.object<UserType>({
    user_id: joi.string().guid({version: 'uuidv4'}).required(),
    user_name: joi.string().required(),
    user_password: joi.string().required(),
    user_photo: joi.string().uri().required(),
    user_email: joi.string().email().required(),
    user_description: joi.string().required(),
    user_contact: joi.number().required(),
    user_status: joi.boolean().required()
})