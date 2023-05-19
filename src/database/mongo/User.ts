import { UserType } from '@src/@types/userType';
import { userModel } from '../mongo-models/usersModel';
import { contactModel } from '../mongo-models/contactModel';

export const getAllUsers = async() => {
    try{
        const users = await userModel.find();
        return users;
    }catch(error){
        throw { status: 500, message: error};
    }
};

export const getOneUser = async (userId: string) => {
    try{
        const user = await userModel.find({id: userId})
        return user;
    }catch(error){
        throw { status: error?.status||500 , message: error?.message || error};
    }
};

export const createNewUser = async(newUser: UserType): Promise<UserType> => {
    try{
        await userModel.create(newUser)
        return newUser;
    }catch (error){
        throw {
            status: 500,
            message: error?.message || error,
        };
    }
};

export const updateOneUser = async(userId: string, changes: Omit<Partial<UserType>, "id">) => {
    try{
        await contactModel.findByIdAndUpdate({id: userId}, changes)
    }catch(error){
        throw { status: error?.status||500 , message: error?.message || error};
    }
};

export const deleteOneUser = async(userId: string): Promise<void> => {
    try{
        await userModel.findOneAndDelete({id: userId})
    }catch(error){
        throw { status: error?.status||500 , message: error?.message || error};
    }
};