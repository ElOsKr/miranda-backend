import { UserType } from '@src/@types/userType';
import { connect, disconnect } from '../mongo-models/connectionMongo';
import { userModel } from '../mongo-models/usersSchema';
import { contactModel } from '../mongo-models/contactSchema';

export const getAllUsers = async() => {
    try{
        await connect();
        const users = await userModel.find();
        await disconnect();
        return users;
    }catch(error){
        throw { status: 500, message: error};
    }
};

export const getOneUser = async (userId: string) => {
    try{
        await connect();
        const user = await userModel.find({id: userId})
        return user;
    }catch(error){
        throw { status: error?.status||500 , message: error?.message || error};
    }
};

export const createNewUser = async(newUser: UserType): Promise<UserType> => {
    try{
        await connect();
        await userModel.create(newUser)
        await disconnect();
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
        await connect();
        await contactModel.findByIdAndUpdate({id: userId}, changes)
    }catch(error){
        throw { status: error?.status||500 , message: error?.message || error};
    }
};

export const deleteOneUser = async(userId: string): Promise<void> => {
    try{
        await connect();
        await userModel.findOneAndDelete({id: userId})
        await disconnect();
    }catch(error){
        throw { status: error?.status||500 , message: error?.message || error};
    }


};