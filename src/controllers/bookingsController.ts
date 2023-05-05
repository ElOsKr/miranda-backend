/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable indent */
/* eslint-disable max-len */
import { BookingsType } from '@src/@types/bookingsType';
import { 
  getBookings,
  getBooking,
  createBooking,
  updateBooking,
  deleteBooking, 
} from '@src/services/bookingsService';
import express from 'express';

export const getAllBookings = (req: express.Request ,res: express.Response) => {
    try{
        const allBookings = getBookings();
        res.send({status: 'OK', data: allBookings});
    }catch(error){
        res.status(error?.status || 500).send({ status: 'FAILED', data: { error: error?.message || error}});
    }
};

export const getOneBooking = (req: express.Request ,res: express.Response) => {
    const {
        params: {bookingId},
    } = req;
    if(!bookingId){
        res.status(400).send({
            status: 'FAILED',
            data: {error: 'BookingId can not be empty'},
        });
    }

    try{
        const booking = getBooking(bookingId);
        res.send({status: 'OK', data: booking});       
    }catch(error){
        res.status(error?.status || 500).send({ status: 'FAILED', data: { error: error?.message || error}});
    }


};

export const createOneBooking = (req: express.Request ,res: express.Response) => {
    
    const { body } = req;

    if(
        !body.photo||
        !body.id||
        !body.guest||
        !body.orderDate||
        !body.checkin||
        !body.checkout||
        !body.roomId||
        !body.price||
        !body.amenities||
        !body.typeRoom||
        !body.description||
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
    }

    const newBooking: BookingsType = {
        photo: body.photo,
        id: body.id,
        guest: body.guest,
        orderDate: {
          date: body.orderDate.date,
          hour: body.orderDate.hour,
          },
        checkin: {
            date: body.checkin.date,
            hour: body.checkin.hour,
          },
        checkout: {
            date: body.checkout.date,
            hour: body.checkout.hour,
          },
        roomId: body.roomId,
        price: body.price,
        amenities: body.amenities,
        typeRoom: body.typeRoom,
        description: body.description,
        specialRequest: body.specialRequest,
        status: body.status,
    };

    try{
        const createdBooking = createBooking(newBooking);
        res.send({status: 'OK', data: createdBooking});
    }catch(error){
        res.status(error?.status || 500).send({ status: 'FAILED', data: { error: error?.message || error}});
    }
};

export const updateOneBooking = (req: express.Request ,res: express.Response) => {
    const {
        body,
        params: { bookingId },
    } = req;

    if(!bookingId){
        res.status(400).send({
            status: 'FAILED',
            data: {error: 'BookingId can not be empty'},
        });
    }

    try{
        const updatedBooking = updateBooking(bookingId,body);
        res.send({status: 'OK', data: updatedBooking});        
    }catch(error){
        res.status(error?.status || 500).send({ status: 'FAILED', data: { error: error?.message || error}});
    }

};

export const deleteOneBooking = (req: express.Request ,res: express.Response) => {
    const {
        params: { bookingId },
    }= req;

    if(!bookingId){
        res.status(400).send({
            status: 'FAILED',
            data: {error: 'BookingId can not be empty'},
        });
    }

    try{
        deleteBooking(bookingId);
        res.send({status: 'OK'});        
    }catch(error){
        res.status(error?.status || 500).send({ status: 'FAILED', data: { error: error?.message || error}});
    }

};