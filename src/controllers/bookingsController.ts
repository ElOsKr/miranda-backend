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
    const booking = getBooking();
    res.send('Get one booking');
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
    res.status(201).send({status: 'OK', data: createBooking});
};

export const updateOneBooking = (req: express.Request ,res: express.Response) => {
    const updatedBooking = updateBooking();
    res.send('Create Booking');
};

export const deleteOneBooking = (req: express.Request ,res: express.Response) => {
    deleteBooking();
    res.send('Delete booking');
};