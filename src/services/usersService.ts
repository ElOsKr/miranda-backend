import { UserType } from '@src/@types/userType';
import { createNewUser, deleteOneUser, getAllUsers, getOneUser, updateOneUser } from '@src/database/Users';
import {uuid}  from 'uuidv4';

export const getUsers = async () => {
    try{
        const allUsers = await getAllUsers();
        return allUsers[0];        
    }catch(error){
        throw error;
    }

};

export const getUser = async (UserId: string) => {
    try{
        const user = await getOneUser(UserId);
        return user[0];
    }catch(error){
        throw error;
    }
};

export const createUser = async (newUser: UserType) => {
    const userToInsert: UserType = {
        ...newUser,
        user_id: uuid(),
    };
    try{
        const createUser = await createNewUser(userToInsert);

        return createUser;
    }catch (error){
        throw error;
    }
};

export const updateUser = async (userId: string, changes: any) => {
    try{
        const updatedUser = await updateOneUser(userId,changes);
        return updatedUser;
    }catch(error){
        throw error;
    }
};

export const deleteUser = async (userId: string) => {
    try{
        await deleteOneUser(userId);
    }catch(error){
        throw error;
    } 
};