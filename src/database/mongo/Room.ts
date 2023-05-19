import { RoomType } from '@src/@types/roomType';
import { roomModel } from '../mongo-models/roomsModel';

export const getAllRooms = async () => {
    try{
        const rooms = await roomModel.find();
        return rooms;
    }catch(error){
        throw { status: 500, message: error};
    }
};

export const getOneRoom = async (roomId: string) => {
    try{
        const room = await roomModel.find({id: roomId});;
        return room;
    }catch(error){
        throw { status: error?.status||500 , message: error?.message || error};
    }
};

export const createNewRoom = async (newRoom: RoomType): Promise<RoomType> => {
    try{
        await roomModel.create(newRoom);
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
        await roomModel.findOneAndUpdate({id: roomId}, changes);;
    }catch(error){
        throw { status: error?.status||500 , message: error?.message || error};
    }
};

export const deleteOneRoom = async(roomId: string): Promise<void> => {
    try{
        await roomModel.findOneAndDelete({id: roomId});
    }catch(error){
        throw { status: error?.status||500 , message: error?.message || error};
    }
};