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
  
roomRouter.get('/:roomId',getOneRoom);
  
roomRouter.post('/', createOneRoom);
  
roomRouter.patch('/:roomId', updateOneRoom);
  
roomRouter.delete('/:roomId',deleteOneRoom);
  
export default roomRouter;