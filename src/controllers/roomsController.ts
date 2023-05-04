/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable indent */
/* eslint-disable max-len */
import { RoomType } from '@src/@types/roomType';
import { 
  getRooms,
  getRoom,
  createRoom,
  updateRoom,
  deleteRoom, 
} from '@src/services/roomsService';
import express from 'express';

export const getAllRooms = (req: express.Request ,res: express.Response) => {
    try{
        const allRooms = getRooms();
        res.send({status: 'OK', data: allRooms});
    }catch(error){
        res.status(error?.status || 500).send({ status: 'FAILED', data: { error: error?.message || error}});
    }
};

export const getOneRoom = (req: express.Request ,res: express.Response) => {
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
        const Room = getRoom(roomId);
        res.send({status: 'OK', data: Room});       
    }catch(error){
        res.status(error?.status || 500).send({ status: 'FAILED', data: { error: error?.message || error}});
    }


};

export const createOneRoom = (req: express.Request ,res: express.Response) => {
    
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
        photo: body.photo,
        number: body.number,
        id: body.id,
        type: body.type,
        price: body.price,
        amenities: body.amenities,
        status: body.status,
        offer: body.offer,

    };

    try{
        const createdRoom = createRoom(newRoom);
        res.send({status: 'OK', data: createdRoom});
    }catch(error){
        res.status(error?.status || 500).send({ status: 'FAILED', data: { error: error?.message || error}});
    }
};

export const updateOneRoom = (req: express.Request ,res: express.Response) => {
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
        const updatedRoom = updateRoom(roomId,body);
        res.send({status: 'OK', data: updatedRoom});        
    }catch(error){
        res.status(error?.status || 500).send({ status: 'FAILED', data: { error: error?.message || error}});
    }

};

export const deleteOneRoom = (req: express.Request ,res: express.Response) => {
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
        deleteRoom(roomId);
        res.send({status: 'OK'});        
    }catch(error){
        res.status(error?.status || 500).send({ status: 'FAILED', data: { error: error?.message || error}});
    }

};