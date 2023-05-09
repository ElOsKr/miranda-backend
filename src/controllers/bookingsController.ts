import { BookingsType } from '@src/@types/bookingsType';
import { 
  getBookings,
  getBooking,
  createBooking,
  updateBooking,
  deleteBooking, 
} from '@src/services/bookingsService';
import express from 'express';

export const getAllBookings = async (req: express.Request ,res: express.Response) => {
    try{
        const allBookings = await getBookings();
        res.send({status: 'OK', data: allBookings});
    }catch(error){
        res.status(error?.status || 500).send({ status: 'FAILED', data: { error: error?.message || error}});
    }
};

export const getOneBooking = async (req: express.Request ,res: express.Response) => {
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
        const booking = await getBooking(bookingId);
        res.send({status: 'OK', data: booking});       
    }catch(error){
        res.status(error?.status || 500).send({ status: 'FAILED', data: { error: error?.message || error}});
    }


};

export const createOneBooking = async (req: express.Request ,res: express.Response) => {
    
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
        booking_photo: body.photo,
        booking_id: body.id,
        booking_guest: body.guest,
        booking_orderDate: body.orderDate.date,
        booking_checkin: body.checkin.date,
        booking_checkout:body.checkout.date,
        room_Id: body.roomId,
        booking_price: body.price,
        booking_amenities: body.amenities,
        booking_description: body.description,
        booking_specialRequest: body.specialRequest,
        booking_status: body.status,
    };

    try{
        const createdBooking = await createBooking(newBooking);
        res.send({status: 'OK', data: createdBooking});
    }catch(error){
        res.status(error?.status || 500).send({ status: 'FAILED', data: { error: error?.message || error}});
    }
};

export const updateOneBooking = async (req: express.Request ,res: express.Response) => {
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
        const updatedBooking = await updateBooking(bookingId,body);
        res.send({status: 'OK', data: updatedBooking});        
    }catch(error){
        res.status(error?.status || 500).send({ status: 'FAILED', data: { error: error?.message || error}});
    }

};

export const deleteOneBooking = async (req: express.Request ,res: express.Response) => {
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
        await deleteBooking(bookingId);
        res.send({status: 'OK'});        
    }catch(error){
        res.status(error?.status || 500).send({ status: 'FAILED', data: { error: error?.message || error}});
    }

};