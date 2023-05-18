import { UserType } from '@src/@types/userType';
import { connection } from './connectionDB';

export const getAllUsers = async() => {
    try{
        const users = (await connection).execute(
            'SELECT * FROM users',
        )
        return users;
    }catch(error){
        throw { status: 500, message: error};
    }
};

export const getOneUser = async (userId: string) => {
    try{
        const user = (await connection).execute(
            'SELECT * FROM users where id = ?',
            [userId],
        );
        return user;
    }catch(error){
        throw { status: error?.status||500 , message: error?.message || error};
    }
};

export const createNewUser = async(newUser: UserType): Promise<UserType> => {
    try{
        (await connection).query(
            'INSERT INTO users SET ?',
            [newUser],
        );
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
        (await connection).query(
            'UPDATE users set ? where id=?',
            [changes,userId],
        );
    }catch(error){
        throw { status: error?.status||500 , message: error?.message || error};
    }
};

export const deleteOneUser = async(userId: string): Promise<void> => {
    try{
        (await connection).execute(
            'DELETE FROM users where id=?',
            [userId],
        );       
    }catch(error){
        throw { status: error?.status||500 , message: error?.message || error};
    }


};