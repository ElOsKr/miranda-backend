import { 
  createOneBooking, 
  deleteOneBooking, 
  getAllBookings, 
  getOneBooking,
  updateOneBooking, 
} from '@src/controllers/bookingsController';
import express from 'express';

const bookingRouter = express.Router();

bookingRouter.get('/',getAllBookings);

bookingRouter.get('/:bookingId',getOneBooking);

bookingRouter.post('/', createOneBooking);

bookingRouter.patch('/:bookingId', updateOneBooking);

bookingRouter.delete('/:bookingId',deleteOneBooking);

export default bookingRouter;