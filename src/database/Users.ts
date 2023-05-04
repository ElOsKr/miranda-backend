/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable max-len */
/* eslint-disable indent */
import { UserType } from '@src/@types/userType';
import users from '@src/data/users.json';
import { saveToDatabase } from '@src/util/usersUtils';

export const getAllUsers = () => {
    try{
        return users;
    }catch(error){
        throw { status: 500, message: error};
    }
};

export const getOneUser = (userId: string) => {

    try{
        const user = users.find((user) => user.id === userId);

        if(!user){
            throw{
                status: 400,
                message: `Can't find user with the id ${userId}`,
            };
        }
        return user;
    }catch(error){
        throw { status: error?.status||500 , message: error?.message || error};
    }
};

export const createNewUser = (newUser: UserType) => {
    const isAlreadyAdded = users.findIndex((user) => user.id === newUser.id);

    if(isAlreadyAdded){
        throw{
            status: 400,
            message: 'The object already exists',
        };
    }

    try{
        const addedUser = users;
        addedUser.push(newUser);
        saveToDatabase(addedUser);
        return newUser;
    }catch (error){
        throw {
            status: 500,
            message: error?.message || error,
        };
    }
};

export const updateOneUser = (userId: string, changes: any) => {

    try{
        const indexForUpdate = users.findIndex((user) => user.id === userId);

        if(indexForUpdate ===-1){
            throw{
                status: 400,
                message: `Can't find user with the id ${userId}`,
            };
        }

        users.map((user)=> {
            if(user.id===userId){
                const updatedUser: UserType = {
                    ...user,
                    ...changes,
                };

                users[indexForUpdate] = updatedUser;

                saveToDatabase(users);
                return updatedUser;
            }else{
                return;
            }
        });
    }catch(error){
        throw { status: error?.status||500 , message: error?.message || error};
    }
};

export const deleteOneUser = (userId: string) => {

    try{
        const deleteUser = users.filter((user)=> user.id!==userId);

        if(deleteUser.length === users.length){
            throw{
                status: 400,
                message: `Can't find user with the id ${userId}`,
            };
        }

        saveToDatabase(deleteUser);        
    }catch(error){
        throw { status: error?.status||500 , message: error?.message || error};
    }


};