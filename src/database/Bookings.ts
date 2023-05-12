import { BookingsType } from '@src/@types/bookingsType';
import { connection } from './connectionDB';

export const getAllBookings = async () => {
    try{
        const bookings = (await connection).execute(
            `SELECT b.*, r.room_type 
             FROM bookings b
             JOIN
             rooms r
             ON b.room_id = r.room_id
            `,
        );
        return bookings;
    }catch(error){
        throw { status: 500, message: error};
    }
};

export const getOneBooking = async (bookingId: string) => {
    try{
        const booking = (await connection).execute(
            'SELECT * FROM bookings where booking_id = ?',
            [bookingId],
        );
        return booking;
    }catch(error){
        throw { status: error?.status||500 , message: error?.message || error};
    }
};

export const createNewBooking = async (newBooking: BookingsType): Promise<BookingsType> => {
    try{
        (await connection).query(
            'INSERT INTO bookings SET ?',
            [newBooking],
        );
        return newBooking;
    }catch (error){
        throw {
            status: 500,
            message: error?.message || error,
        };
    }
};

export const updateOneBooking = async (bookingId: string, changes: Omit<Partial<BookingsType>, "booking_id">): Promise<void> => {
    try{
        (await connection).query(
            'UPDATE bookings set ? where booking_id=?',
            [changes,bookingId],
        );
    }catch(error){
        throw { status: error?.status||500 , message: error?.message || error};
    }
};

export const deleteOneBooking = async (bookingId: string): Promise<void> => {
    try{
        (await connection).execute(
            'DELETE FROM bookings where booking_id=?',
            [bookingId],
        );       
    }catch(error){
        throw { status: error?.status||500 , message: error?.message || error};
    }


};