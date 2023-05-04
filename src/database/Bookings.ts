/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable max-len */
/* eslint-disable indent */
import { BookingsType } from '@src/@types/bookingsType';
import bookings from '@src/data/bookings.json';
import { saveToDatabase } from '@src/util/bookingsUtils';

export const getAllBookings = () => {
    try{
        return bookings;
    }catch(error){
        throw { status: 500, message: error};
    }
};

export const getOneBooking = (bookingId: string) => {

    try{
        const booking = bookings.find((booking) => booking.id === bookingId);

        if(!booking){
            throw{
                status: 400,
                message: `Can't find booking with the id ${bookingId}`,
            };
        }
        return booking;
    }catch(error){
        throw { status: error?.status||500 , message: error?.message || error};
    }
};

export const createNewBooking = (newBooking: BookingsType) => {
    const isAlreadyAdded = bookings.findIndex((booking) => booking.id === newBooking.id);

    if(isAlreadyAdded){
        throw{
            status: 400,
            message: 'The object already exists',
        };
    }

    try{
        const addedBooking = bookings;
        addedBooking.push(newBooking);
        saveToDatabase(addedBooking);
        return newBooking;
    }catch (error){
        throw {
            status: 500,
            message: error?.message || error,
        };
    }
};

export const updateOneBooking = (bookingId: string, changes: any) => {

    try{
        const indexForUpdate = bookings.findIndex((booking) => booking.id === bookingId);

        if(indexForUpdate ===-1){
            throw{
                status: 400,
                message: `Can't find booking with the id ${bookingId}`,
            };
        }

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
    }catch(error){
        throw { status: error?.status||500 , message: error?.message || error};
    }
};

export const deleteOneBooking = (bookingId: string) => {

    try{
        const deleteBooking = bookings.filter((booking)=> booking.id!==bookingId);

        if(deleteBooking.length === bookings.length){
            throw{
                status: 400,
                message: `Can't find booking with the id ${bookingId}`,
            };
        }

        saveToDatabase(deleteBooking);        
    }catch(error){
        throw { status: error?.status||500 , message: error?.message || error};
    }


};