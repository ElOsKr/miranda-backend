import { BookingsType } from '@src/@types/bookingsType';
import { 
  getBookings,
  getBooking,
  createBooking,
  updateBooking,
  deleteBooking, 
} from '@src/services/bookingsService';
import express from 'express';
import { uuid } from 'uuidv4';

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
        !body.booking_photo||
        !body.booking_guest||
        !body.booking_orderDate||
        !body.booking_checkin||
        !body.booking_checkout||
        !body.room_id||
        !body.booking_price||
        !body.booking_amenities||
        !body.booking_description||
        (!body.booking_status && typeof body.booking_status !== "boolean")
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
        if(!body[key] && body.booking_status !==false){
            res.status(400).send({
                status: 'Failed',
                data: {
                    error: 'missing params',
                },
            });
        }
    }

    const newBooking: BookingsType = {
        booking_photo: body.booking_photo,
        booking_id: uuid(),
        booking_guest: body.booking_guest,
        booking_orderDate: body.booking_orderDate,
        booking_checkin: body.booking_checkin,
        booking_checkout:body.booking_checkout,
        room_Id: body.room_id,
        booking_price: body.booking_price,
        booking_amenities: body.booking_amenities,
        booking_description: body.booking_description,
        booking_specialRequest: body.booking_specialRequest,
        booking_status: body.booking_status,
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