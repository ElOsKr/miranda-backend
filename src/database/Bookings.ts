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
        return;
    }

    bookings.push(newBooking);
    saveToDatabase(bookings);
    return newBooking;
};

export const updateOneBooking = (bookingId: string, changes: any) => {

    bookings.map((booking)=> {
        if(booking.id===bookingId){
            const updatedBooking: BookingsType = {
                booking,
                ...changes,
            };

            booking=updatedBooking;

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