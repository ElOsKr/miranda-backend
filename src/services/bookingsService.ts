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
    const allBookings = getAllBookings();
    return allBookings;
};

export const getBooking = (bookingId: string) => {
    const booking = getOneBooking(bookingId);
    return booking;
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
    const updatedBooking = updateOneBooking(bookingId,changes);
    return updatedBooking;
};

export const deleteBooking = (bookingId: string) => {
    deleteOneBooking(bookingId);
};