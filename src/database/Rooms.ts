/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable max-len */
/* eslint-disable indent */
import { RoomType } from '@src/@types/roomType';
import { connection } from './connectionDB';

export const getAllRooms = async () => {
    try{
        const rooms = (await connection).query(
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
            'SELECT * FROM rooms where room_id = ?',
            [roomId],
        );
        return room;
    }catch(error){
        throw { status: error?.status||500 , message: error?.message || error};
    }
};

export const createNewRoom = async (newRoom: RoomType) => {

    try{
        (await connection).execute(
            'INSERT INTO rooms (room_id, room_number, room_photo, room_type, room_amenities, room_price, room_offer,room_status) VALUES (?,?,?,?,?,?,?,?)',
            [
                newRoom.id,
                newRoom.number,
                newRoom.photo,
                newRoom.type,
                newRoom.amenities,
                newRoom.price,
                newRoom.offer,
                newRoom.status,
            ],
        );
        return newRoom;
    }catch (error){
        throw {
            status: 500,
            message: error?.message || error,
        };
    }
};

export const updateOneRoom = async(roomId: string, changes: any) => {

    try{
        (await connection).execute(
            'UPDATE rooms set ? where room_id=?',
            [changes,roomId],
        );
    }catch(error){
        throw { status: error?.status||500 , message: error?.message || error};
    }
};

export const deleteOneRoom = async(roomId: string) => {

    try{
        (await connection).execute(
            'DELETE FROM rooms where room_id=?',
            [roomId],
        );
    }catch(error){
        throw { status: error?.status||500 , message: error?.message || error};
    }


};