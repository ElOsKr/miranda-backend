import { UserType } from '@src/@types/userType';
import { createNewUser, deleteOneUser, getAllUsers, getOneUser, updateOneUser } from '@src/database/mongo/Users';

export const getUsers = async () => {
    try{
        const allUsers = await getAllUsers();
        return allUsers;        
    }catch(error){
        throw error;
    }

};

export const getUser = async (UserId: string) => {
    try{
        const user = await getOneUser(UserId);
        return user;
    }catch(error){
        throw error;
    }
};

export const createUser = async (newUser: UserType) => {
    try{
        const createUser = await createNewUser(newUser);
        return createUser;
    }catch (error){
        throw error;
    }
};

export const updateUser = async (userId: string, changes: Omit<Partial<UserType>, "user_id">) => {
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