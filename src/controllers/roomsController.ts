import { RoomType } from '@src/@types/roomType';
import { 
  getRooms,
  getRoom,
  createRoom,
  updateRoom,
  deleteRoom, 
} from '@src/services/roomsService';
import { roomSchema } from '@src/util/validate/roomsValidate';
import express from 'express';
import { uuid } from 'uuidv4';

export const getAllRooms = async(req: express.Request ,res: express.Response) => {
    try{
        const allRooms = await getRooms();
        res.send({status: 'OK', data: allRooms});
    }catch(error){
        res.status(error?.status || 500).send({ status: 'FAILED', data: { error: error?.message || error}});
    }
};

export const getOneRoom = async(req: express.Request ,res: express.Response) => {
    const {
        params: {roomId},
    } = req;
    if(!roomId){
        res.status(400).send({
            status: 'FAILED',
            data: {error: 'RoomId can not be empty'},
        });
    }

    try{
        const Room = await getRoom(roomId);
        res.send({status: 'OK', data: Room});       
    }catch(error){
        res.status(error?.status || 500).send({ status: 'FAILED', data: { error: error?.message || error}});
    }


};

export const createOneRoom = async(req: express.Request ,res: express.Response) => {
    
    const { body } = req;

    if(
        !body.room_photo||
        !body.room_number||
        !body.room_price||
        !body.room_type||
        (!body.room_status && typeof body.room_status !== "boolean")
    ){
        res.status(400).send({
            status: 'Failed',
            data: {
                error: 'Cannot create object',
            },
        });
        return;
    }
    
    for ( const key in body ){
        if(!body[key] && body[key] !==false){
            res.status(400).send({
                status: 'Failed',
                data: {
                    error: 'missing params',
                },
            });
        }
    }

    const newRoom: RoomType = {
        room_id: uuid(),
        room_photo: body.room_photo,
        room_number: body.room_number,
        room_type: body.room_type,
        room_price: body.room_price,
        room_amenities: body.room_amenities,
        room_status: (body.room_status),
        room_offer: body.room_offer,

    };

    try{
        await roomSchema.validateAsync(newRoom)
        const createdRoom = await createRoom(newRoom);
        res.send({status: 'OK', data: createdRoom});
    }catch(error){
        res.status(error?.status || 500).send({ status: 'FAILED', data: { error: error?.message || error}});
    }
};

export const updateOneRoom = async (req: express.Request ,res: express.Response) => {
    const {
        body,
        params: { roomId },
    } = req;

    if(!roomId){
        res.status(400).send({
            status: 'FAILED',
            data: {error: 'RoomId can not be empty'},
        });
    }

    try{
        if(body.room_id){
            throw new Error("Cannot update room_id")
        }
        await roomSchema.validateAsync(body)
        const updatedRoom = await updateRoom(roomId,body);
        res.send({status: 'OK', data: updatedRoom});        
    }catch(error){
        res.status(error?.status || 500).send({ status: 'FAILED', data: { error: error?.message || error}});
    }

};

export const deleteOneRoom = async (req: express.Request ,res: express.Response) => {
    const {
        params: { roomId },
    }= req;

    if(!roomId){
        res.status(400).send({
            status: 'FAILED',
            data: {error: 'RoomId can not be empty'},
        });
    }

    try{
        await deleteRoom(roomId);
        res.send({status: 'OK'});        
    }catch(error){
        res.status(error?.status || 500).send({ status: 'FAILED', data: { error: error?.message || error}});
    }

};