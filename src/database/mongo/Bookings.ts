import { BookingsType } from '../../@types/bookingsType';
import { connect, disconnect } from '../mongo-models/connectionMongo';
import { bookingModel } from '../mongo-models/bookingSchema';
import { contactModel } from '../mongo-models/contactSchema';

export const getAllBookings = async () => {
    try{
        await connect();
        const bookings = await bookingModel.find();
        await disconnect();
        return bookings;
    }catch(error){
        throw { status: 500, message: error};
    }
};

export const getOneBooking = async (bookingId: string) => {
    try{
        await connect();
        const booking = await bookingModel.find({id: bookingId})
        await disconnect();
        return booking;
    }catch(error){
        throw { status: error?.status||500 , message: error?.message || error};
    }
};

export const createNewBooking = async (newBooking: BookingsType): Promise<BookingsType> => {
    try{
        await connect();
        await contactModel.create(newBooking);
        await disconnect();
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
        await connect();
        await bookingModel.findOneAndUpdate({id: bookingId}, changes);
        await disconnect();
    }catch(error){
        throw { status: error?.status||500 , message: error?.message || error};
    }
};

export const deleteOneBooking = async (bookingId: string): Promise<void> => {
    try{
        await connect();
        await bookingModel.findOneAndDelete({id: bookingId})
    }catch(error){
        throw { status: error?.status||500 , message: error?.message || error};
    }


};