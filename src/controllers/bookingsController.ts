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
    const allBookings = getBookings();
    res.send({status: 'OK', data: allBookings});
};

export const getOneBooking = (req: express.Request ,res: express.Response) => {
    const {
        params: {bookingId},
    } = req;
    if(!bookingId){
        return;
    }

    const booking = getBooking(bookingId);
    res.send({status: 'OK', data: booking});
};

export const createOneBooking = (req: express.Request ,res: express.Response) => {
    const { body } = req;
    
    for ( const key in body ){
        if(!body[key]){
            return;
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
        status: body.status,
    };

    const createdBooking = createBooking(newBooking);
    res.status(201).send({status: 'OK', data: createdBooking});
};

export const updateOneBooking = (req: express.Request ,res: express.Response) => {
    const {
        body,
        params: { bookingId },
    } = req;

    if(!bookingId){
        return;
    }

    const updatedBooking = updateBooking(bookingId,body);
    res.send({status: 'OK', data: updatedBooking});
};

export const deleteOneBooking = (req: express.Request ,res: express.Response) => {
    const {
        params: { bookingId },
    }= req;

    if(bookingId){
        return;
    }
    deleteBooking(bookingId);
    res.status(204).send({status: 'OK'});
};