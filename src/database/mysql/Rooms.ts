import { RoomType } from '@src/@types/roomType';
import { connection } from './connectionDB';

export const getAllRooms = async () => {
    try{
        const rooms = (await connection).execute(
            'SELECT * FROM rooms',
        );
        return rooms;
    }catch(error){
        throw { status: 500, message: error};
    }
};

export const getOneRoom = async (roomId: string) => {
    try{
        const room = (await connection).execute(
            'SELECT * FROM rooms where id = ?',
            [roomId],
        );
        return room;
    }catch(error){
        throw { status: error?.status||500 , message: error?.message || error};
    }
};

export const createNewRoom = async (newRoom: RoomType): Promise<RoomType> => {
    try{
        (await connection).query(
            'INSERT INTO rooms SET ?',
            [newRoom]
        );
        return newRoom;
    }catch (error){
        throw {
            status: 500,
            message: error?.message || error,
        };
    }
};

export const updateOneRoom = async(roomId: string, changes: Omit<Partial<RoomType>, "id">) => {
    try{
        (await connection).query(
            'UPDATE rooms set ? where id=?',
            [changes,roomId],
        );
    }catch(error){
        throw { status: error?.status||500 , message: error?.message || error};
    }
};

export const deleteOneRoom = async(roomId: string): Promise<void> => {
    try{
        (await connection).execute(
            'DELETE FROM rooms where id=?',
            [roomId],
        );
    }catch(error){
        throw { status: error?.status||500 , message: error?.message || error};
    }


};