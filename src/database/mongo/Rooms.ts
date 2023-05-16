import { RoomType } from '@src/@types/roomType';
import { connect, disconnect } from '../mongo-models/connectionMongo';
import { roomModel } from '../mongo-models/roomsSchema';

export const getAllRooms = async () => {
    try{
        await connect();
        const rooms = await roomModel.find();
        await disconnect()
        return rooms;
    }catch(error){
        throw { status: 500, message: error};
    }
};

export const getOneRoom = async (roomId: string) => {
    try{
        await connect();
        const room = await roomModel.find({id: roomId});
        await disconnect();
        return room;
    }catch(error){
        throw { status: error?.status||500 , message: error?.message || error};
    }
};

export const createNewRoom = async (newRoom: RoomType): Promise<RoomType> => {
    try{
        await connect();
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
        await connect();
        await roomModel.findOneAndUpdate({id: roomId}, changes);
        await disconnect();
    }catch(error){
        throw { status: error?.status||500 , message: error?.message || error};
    }
};

export const deleteOneRoom = async(roomId: string): Promise<void> => {
    try{
        await connect();
        await roomModel.findOneAndDelete({id: roomId});
        await disconnect
    }catch(error){
        throw { status: error?.status||500 , message: error?.message || error};
    }


};