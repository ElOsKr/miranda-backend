import { RoomType } from '@src/@types/roomType';
import { createNewRoom, deleteOneRoom, getAllRooms, getOneRoom, updateOneRoom } from '@src/database/Rooms';

export const getRooms = async() => {
    try{
        const allRooms = await getAllRooms();
        return allRooms[0];        
    }catch(error){
        throw error;
    }
};

export const getRoom = async (roomId: string) => {
    try{
        const room = await getOneRoom(roomId);
        return room[0];
    }catch(error){
        throw error;
    }
};

export const createRoom = async (newRoom: RoomType) => {
    try{
        const createRoom = await createNewRoom(newRoom);
        return createRoom;
    }catch (error){
        throw error;
    }
};

export const updateRoom = async (roomId: string, changes: any) => {
    try{
        const updatedRoom = await updateOneRoom(roomId,changes);
        return updatedRoom;
    }catch(error){
        throw error;
    }
};

export const deleteRoom = async (roomId: string) => {
    try{
        await deleteOneRoom(roomId);
    }catch(error){
        throw error;
    } 
};