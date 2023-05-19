import { BookingsType } from '../../@types/bookingsType';
import { bookingModel } from '../mongo-models/bookingModel';

export const getAllBookings = async () => {
    try{
        const bookings = await bookingModel.find();
        return bookings;
    }catch(error){
        throw { status: 500, message: error};
    }
};

export const getOneBooking = async (bookingId: string) => {
    try{
        const booking = await bookingModel.find({id: bookingId})
        return booking;
    }catch(error){
        throw { status: error?.status||500 , message: error?.message || error};
    }
};

export const createNewBooking = async (newBooking: BookingsType): Promise<BookingsType> => {
    try{
        await bookingModel.create(newBooking);
        return newBooking;
    }catch (error){
        throw {
            status: 500,
            message: error?.message || error,
        };
    }
};

export const updateOneBooking = async (bookingId: string, changes: Omit<Partial<BookingsType>, "id">): Promise<void> => {
    try{
        await bookingModel.findOneAndUpdate({id: bookingId}, changes);
    }catch(error){
        throw { status: error?.status||500 , message: error?.message || error};
    }
};

export const deleteOneBooking = async (bookingId: string): Promise<void> => {
    try{
        await bookingModel.findOneAndDelete({id: bookingId})
    }catch(error){
        throw { status: error?.status||500 , message: error?.message || error};
    }
};