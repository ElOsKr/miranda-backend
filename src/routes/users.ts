import { 
  createOneUser, 
  deleteOneUser, 
  getAllUsers, 
  getOneUser,
  updateOneUser, 
} from '@src/controllers/usersController';
import express from 'express';
  
const userRouter = express.Router();
  
userRouter.get('/',getAllUsers);
  
userRouter.get('/:userId',getOneUser);
  
userRouter.post('/', createOneUser);
  
userRouter.patch('/:userId', updateOneUser);
  
userRouter.delete('/:userId',deleteOneUser);
  
export default userRouter;