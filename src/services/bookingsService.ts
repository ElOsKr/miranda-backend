/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable indent */
import { BookingsType } from '@src/@types/bookingsType';
import { createNewBooking, getAllBookings } from '@src/database/Bookings';
import uuid  from 'uuid';

export const getBookings = () => {
    const allBookings = getAllBookings();
    return allBookings;
};

export const getBooking = () => {
  return;
};

export const createBooking = (newBooking: BookingsType) => {
    const BookingToInsert = {
        ...newBooking,
        id: uuid.v4(),
    };

    const createBooking = createNewBooking(BookingToInsert);

    return createBooking;
};

export const updateBooking = () => {
  return;
};

export const deleteBooking = () => {
  return;
};