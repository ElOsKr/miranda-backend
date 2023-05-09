import { RoomType } from '@src/@types/roomType';
import { 
  getRooms,
  getRoom,
  createRoom,
  updateRoom,
  deleteRoom, 
} from '@src/services/roomsService';
import express from 'express';

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
        !body.photo||
        !body.number||
        !body.id||
        !body.price||
        !body.status
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
        if(!body[key]){
            res.status(400).send({
                status: 'Failed',
                data: {
                    error: 'missing params',
                },
            });
        }
        return;
    }

    const newRoom: RoomType = {
        room_photo: body.photo,
        room_number: body.number,
        room_id: body.id,
        room_type: body.type,
        room_price: body.price,
        room_amenities: body.amenities,
        room_status: body.status,
        room_offer: body.offer,

    };

    try{
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