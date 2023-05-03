/* eslint-disable max-len */
/* eslint-disable indent */
import { BookingsType } from '@src/@types/bookingsType';
import bookings from '@src/data/bookings.json';
import { saveToDatabase } from '@src/util/bookingsUtils';

export const getAllBookings = ()=> {
    return bookings;
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
