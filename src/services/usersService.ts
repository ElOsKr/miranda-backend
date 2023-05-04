/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable indent */
import { UserType } from '@src/@types/userType';
import { createNewUser, deleteOneUser, getAllUsers, getOneUser, updateOneUser } from '@src/database/Users';
import {uuid}  from 'uuidv4';

export const getUsers = () => {
    try{
        const allUsers = getAllUsers();
        return allUsers;        
    }catch(error){
        throw error;
    }

};

export const getUser = (UserId: string) => {
    try{
        const user = getOneUser(UserId);
        return user;
    }catch(error){
        throw error;
    }
};

export const createUser = (newUser: UserType) => {
    const userToInsert: UserType = {
        ...newUser,
        id: uuid(),
    };
    try{
        const createUser = createNewUser(userToInsert);

        return createUser;
    }catch (error){
        throw error;
    }
};

export const updateUser = (userId: string, changes: any) => {
    try{
        const updatedUser = updateOneUser(userId,changes);
        return updatedUser;
    }catch(error){
        throw error;
    }
};

export const deleteUser = (userId: string) => {
    try{
        deleteOneUser(userId);
    }catch(error){
        throw error;
    } 
};