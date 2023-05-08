/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable indent */
import { RoomType } from '@src/@types/roomType';
import { createNewRoom, deleteOneRoom, getAllRooms, getOneRoom, updateOneRoom } from '@src/database/Rooms';
import {uuid}  from 'uuidv4';

export const getRooms = async() => {
    try{
        const allRooms = await getAllRooms();
        return allRooms[0];        
    }catch(error){
        throw error;
    }

};

export const getRoom = (roomId: string) => {
    try{
        const room = getOneRoom(roomId);
        return room;
    }catch(error){
        throw error;
    }
};

export const createRoom = (newRoom: RoomType) => {
    const roomToInsert: RoomType = {
        ...newRoom,
        id: uuid(),
    };
    try{
        const createRoom = createNewRoom(roomToInsert);

        return createRoom;
    }catch (error){
        throw error;
    }
};

export const updateRoom = (roomId: string, changes: any) => {
    try{
        const updatedRoom = updateOneRoom(roomId,changes);
        return updatedRoom;
    }catch(error){
        throw error;
    }
};

export const deleteRoom = (roomId: string) => {
    try{
        deleteOneRoom(roomId);
    }catch(error){
        throw error;
    } 
};