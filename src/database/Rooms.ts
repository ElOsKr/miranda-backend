/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable max-len */
/* eslint-disable indent */
import { RoomType } from '@src/@types/roomType';
import rooms from '@src/data/rooms.json';
import { saveToDatabase } from '@src/util/roomsUtils';

export const getAllRooms = () => {
    try{
        return rooms;
    }catch(error){
        throw { status: 500, message: error};
    }
};

export const getOneRoom = (roomId: string) => {

    try{
        const room = rooms.find((room) => room.id === roomId);

        if(!room){
            throw{
                status: 400,
                message: `Can't find Room with the id ${roomId}`,
            };
        }
        return room;
    }catch(error){
        throw { status: error?.status||500 , message: error?.message || error};
    }
};

export const createNewRoom = (newRoom: RoomType) => {
    const isAlreadyAdded = rooms.findIndex((room) => room.id === newRoom.id);

    if(isAlreadyAdded){
        throw{
            status: 400,
            message: 'The object already exists',
        };
    }

    try{
        const addedRoom = rooms;
        addedRoom.push(newRoom);
        saveToDatabase(addedRoom);
        return newRoom;
    }catch (error){
        throw {
            status: 500,
            message: error?.message || error,
        };
    }
};

export const updateOneRoom = (roomId: string, changes: any) => {

    try{
        const indexForUpdate = rooms.findIndex((room) => room.id === roomId);

        if(indexForUpdate ===-1){
            throw{
                status: 400,
                message: `Can't find Room with the id ${roomId}`,
            };
        }

        rooms.map((room)=> {
            if(room.id===roomId){
                const updatedRoom: RoomType = {
                    ...room,
                    ...changes,
                };

                rooms[indexForUpdate] = updatedRoom;

                saveToDatabase(rooms);
                return updatedRoom;
            }else{
                return;
            }
        });
    }catch(error){
        throw { status: error?.status||500 , message: error?.message || error};
    }
};

export const deleteOneRoom = (roomId: string) => {

    try{
        const deleteRoom = rooms.filter((room)=> room.id!==roomId);

        if(deleteRoom.length === rooms.length){
            throw{
                status: 400,
                message: `Can't find Room with the id ${roomId}`,
            };
        }

        saveToDatabase(deleteRoom);        
    }catch(error){
        throw { status: error?.status||500 , message: error?.message || error};
    }


};