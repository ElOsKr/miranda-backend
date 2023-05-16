import { BookingsType } from '@src/@types/bookingsType';
import { createNewBooking, deleteOneBooking, getAllBookings, getOneBooking, updateOneBooking } from '@src/database/mongo/Bookings';

export const getBookings = async () => {
    try{
        const allBookings = await getAllBookings();
        return allBookings;        
    }catch(error){
        throw error;
    }

};

export const getBooking = async (bookingId: string) => {
    try{
        const booking = await getOneBooking(bookingId);
        return booking;
    }catch(error){
        throw error;
    }
};

export const createBooking = async (newBooking: BookingsType) => {
    try{
        const createBooking = await createNewBooking(newBooking);
        return createBooking;
    }catch (error){
        throw error;
    }
};

export const updateBooking = async (bookingId: string, changes: Omit<Partial<BookingsType>, "booking_id">) => {
    try{
        const updatedBooking = await updateOneBooking(bookingId,changes);
        return updatedBooking;
    }catch(error){
        throw error;
    }
};

export const deleteBooking = async (bookingId: string) => {
    try{
        await deleteOneBooking(bookingId);
    }catch(error){
        throw error;
    } 
};