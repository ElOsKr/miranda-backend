import { 
  createOneRoom, 
  deleteOneRoom, 
  getAllRooms, 
  getOneRoom,
  updateOneRoom, 
} from '@src/controllers/roomsController';
import express from 'express';
  
const roomRouter = express.Router();
  
roomRouter.get('/',getAllRooms);
  
roomRouter.get('/:RoomId',getOneRoom);
  
roomRouter.post('/', createOneRoom);
  
roomRouter.patch('/:RoomId', updateOneRoom);
  
roomRouter.delete('/:RoomId',deleteOneRoom);
  
export default roomRouter;