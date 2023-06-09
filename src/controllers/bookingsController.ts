import { BookingsType } from '../../src/@types/bookingsType';
import { 
  getBookings,
  getBooking,
  createBooking,
  updateBooking,
  deleteBooking, 
} from '../services/bookingsService';
import express from 'express';
import { uuid } from 'uuidv4';
import { bookingSchema } from '../util/validate/bookingsValidate';

export const getAllBookings = async (req: express.Request ,res: express.Response) => {
    try{
        const allBookings = await getBookings();
        return res.json({status: 'OK', data: allBookings});
    }catch(error){
        return res.status(error?.status || 500).json({ status: 'FAILED', data: { error: error?.message || error}});
    }
};

export const getOneBooking = async (req: express.Request ,res: express.Response) => {
    const {
        params: {bookingId},
    } = req;
    if(!bookingId){
        return res.status(400).json({
            status: 'FAILED',
            data: {error: 'BookingId can not be empty'},
        });
    }

    try{
        const booking = await getBooking(bookingId);
        return res.json({status: 'OK', data: booking});       
    }catch(error){
        return res.status(error?.status || 500).json({ status: 'FAILED', data: { error: error?.message || error}});
    }
};

export const createOneBooking = async (req: express.Request ,res: express.Response) => {
    const { body } = req;

    if(
        !body.photo||
        !body.guest||
        !body.orderDate||
        !body.checkin||
        !body.checkout||
        !body.room_Id||
        !body.price||
        !body.amenities||
        !body.description||
        (!body.status && typeof body.status !== "boolean")
    ){
        return res.status(400).json({
            status: 'Failed',
            data: {
                error: 'Cannot create object',
            },
        });
    }
    
    for ( const key in body ){
        if(!body[key] && body.status !==false){
            return res.status(400).json({
                status: 'Failed',
                data: {
                    error: 'missing params',
                },
            });
        }
    }

    const newBooking: BookingsType = {
        photo: body.photo,
        id: uuid(),
        guest: body.guest,
        orderDate: body.orderDate,
        checkin: body.checkin,
        checkout:body.checkout,
        room_Id: body.room_Id,
        price: body.price,
        amenities: body.amenities,
        description: body.description,
        specialRequest: body.specialRequest,
        status: body.status,
    };

    try{
        await bookingSchema.validateAsync(newBooking);
        const createdBooking = await createBooking(newBooking);
        return res.json({status: 'OK', data: createdBooking});
    }catch(error){
        return res.status(error?.status || 500).json({ status: 'FAILED', data: { error: error?.message || error}});
    }
};

export const updateOneBooking = async (req: express.Request ,res: express.Response) => {
    const {
        body,
        params: { bookingId },
    } = req;

    if(!bookingId){
        return res.status(400).json({
            status: 'FAILED',
            data: {error: 'BookingId can not be empty'},
        });
    }

    try{
        if(body.id){
            throw new Error("Cannot update id")
        }
        await bookingSchema.validateAsync(body)
        const updatedBooking = await updateBooking(bookingId,body);
        return res.json({status: 'OK', data: updatedBooking});        
    }catch(error){
        return res.status(error?.status || 500).json({ status: 'FAILED', data: { error: error?.message || error}});
    }
};

export const deleteOneBooking = async (req: express.Request ,res: express.Response) => {
    const {
        params: { bookingId },
    }= req;

    if(!bookingId){
        return res.status(400).json({
            status: 'FAILED',
            data: {error: 'BookingId can not be empty'},
        });
    }

    try{
        await deleteBooking(bookingId);
        return res.json({status: 'OK'});        
    }catch(error){
        return res.status(error?.status || 500).json({ status: 'FAILED', data: { error: error?.message || error}});
    }
};