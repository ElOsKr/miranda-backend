/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable max-len */
/* eslint-disable indent */
import { BookingsType } from '@src/@types/bookingsType';
import bookings from '@src/data/bookings.json';
import { saveToDatabase } from '@src/util/bookingsUtils';

export const getAllBookings = () => {
    return bookings;
};

export const getOneBooking = (bookingId: string) => {
    const booking = bookings.find((booking) => booking.id === bookingId);

    if(!booking){
        return;
    }
    return booking;
};

export const createNewBooking = (newBooking: BookingsType) => {
    const isAlreadyAdded = bookings.find((booking) => booking.id === newBooking.id);

    if(isAlreadyAdded){
        throw{
            status: 400,
            message: 'The object already exists',
        };
    }

    try{
        bookings.push(newBooking);
        saveToDatabase(bookings);
        return newBooking;
    }catch (error){
        throw {
            status: 500,
            message: error?.message || error,
        };
    }
};

export const updateOneBooking = (bookingId: string, changes: any) => {

    const indexForUpdate = bookings.findIndex((booking) => booking.id === bookingId);

    bookings.map((booking)=> {
        if(booking.id===bookingId){
            const updatedBooking: BookingsType = {
                ...booking,
                ...changes,
            };

            bookings[indexForUpdate] = updatedBooking;

            saveToDatabase(bookings);
            return updatedBooking;
        }else{
            return;
        }
    });
};

export const deleteOneBooking = (bookingId: string) => {
    bookings.filter((booking)=> booking.id!==bookingId);

    saveToDatabase(bookings);

};