import { RoomType } from '../@types/roomType';
import { 
  getRooms,
  getRoom,
  createRoom,
  updateRoom,
  deleteRoom, 
} from '../services/roomsService';
import { roomSchema } from '../util/validate/roomsValidate';
import express from 'express';
import { uuid } from 'uuidv4';

export const getAllRooms = async(req: express.Request ,res: express.Response) => {
    try{
        const allRooms = await getRooms();
        return res.json({status: 'OK', data: allRooms});
    }catch(error){
        return res.status(error?.status || 500).json({ status: 'FAILED', data: { error: error?.message || error}});
    }
};

export const getOneRoom = async(req: express.Request ,res: express.Response) => {
    const {
        params: {roomId},
    } = req;
    if(!roomId){
        return res.status(400).json({
            status: 'FAILED',
            data: {error: 'RoomId can not be empty'},
        });
    }

    try{
        const Room = await getRoom(roomId);
        return res.json({status: 'OK', data: Room});       
    }catch(error){
        return res.status(error?.status || 500).json({ status: 'FAILED', data: { error: error?.message || error}});
    }


};

export const createOneRoom = async(req: express.Request ,res: express.Response) => {
    
    const { body } = req;

    if(
        !body.photo||
        !body.number||
        !body.price||
        !body.type||
        (!body.status && typeof body.status !== "boolean")
    ){
        return res.status(400).json({
            status: 'Failed',
            data: {
                error: 'Cannot create object',
            },
        });
        return;
    }
    
    for ( const key in body ){
        if(!body[key] && body[key] !==false && body[key] !==0){
            return res.status(400).json({
                status: 'Failed',
                data: {
                    error: 'missing params',
                },
            });
        }
    }

    const newRoom: RoomType = {
        id: uuid(),
        photo: body.photo,
        number: body.number,
        type: body.type,
        price: body.price,
        amenities: body.amenities,
        status: (body.status),
        offer: body.offer,

    };

    try{
        await roomSchema.validateAsync(newRoom)
        const createdRoom = await createRoom(newRoom);
        return res.json({status: 'OK', data: createdRoom});
    }catch(error){
        return res.status(error?.status || 500).json({ status: 'FAILED', data: { error: error?.message || error}});
    }
};

export const updateOneRoom = async (req: express.Request ,res: express.Response) => {
    const {
        body,
        params: { roomId },
    } = req;

    if(!roomId){
        return res.status(400).json({
            status: 'FAILED',
            data: {error: 'RoomId can not be empty'},
        });
    }

    try{
        if(body.id){
            throw new Error("Cannot update id")
        }
        await roomSchema.validateAsync(body)
        const updatedRoom = await updateRoom(roomId,body);
        return res.json({status: 'OK', data: updatedRoom});        
    }catch(error){
        return res.status(error?.status || 500).json({ status: 'FAILED', data: { error: error?.message || error}});
    }

};

export const deleteOneRoom = async (req: express.Request ,res: express.Response) => {
    const {
        params: { roomId },
    }= req;

    if(!roomId){
        return res.status(400).json({
            status: 'FAILED',
            data: {error: 'RoomId can not be empty'},
        });
    }

    try{
        await deleteRoom(roomId);
        return res.json({status: 'OK'});        
    }catch(error){
        return res.status(error?.status || 500).json({ status: 'FAILED', data: { error: error?.message || error}});
    }

};