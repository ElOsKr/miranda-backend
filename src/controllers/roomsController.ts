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
        !body.photo||
        !body.number||
        !body.price||
        !body.type||
        (!body.status && typeof body.status !== "boolean")
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
        if(body.id){
            throw new Error("Cannot update id")
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