/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable indent */
import { BookingsType } from '@src/@types/bookingsType';
import { createNewBooking, deleteOneBooking, getAllBookings, getOneBooking, updateOneBooking } from '@src/database/Bookings';
import {uuid}  from 'uuidv4';

export const getBookings = () => {
    try{
        const allBookings = getAllBookings();
        return allBookings;        
    }catch(error){
        throw error;
    }

};

export const getBooking = (bookingId: string) => {
    try{
        const booking = getOneBooking(bookingId);
        return booking;
    }catch(error){
        throw error;
    }
};

export const createBooking = (newBooking: BookingsType) => {
    const BookingToInsert: BookingsType = {
        ...newBooking,
        id: uuid(),
    };
    try{
        const createBooking = createNewBooking(BookingToInsert);

        return createBooking;
    }catch (error){
        throw error;
    }
};

export const updateBooking = (bookingId: string, changes: any) => {
    try{
        const updatedBooking = updateOneBooking(bookingId,changes);
        return updatedBooking;
    }catch(error){
        throw error;
    }
};

export const deleteBooking = (bookingId: string) => {
    try{
        deleteOneBooking(bookingId);
    }catch(error){
        throw error;
    } 
};