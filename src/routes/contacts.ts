import { 
  createOneContact, 
  deleteOneContact, 
  getAllContacts, 
  getOneContact,
  updateOneContact, 
} from '@src/controllers/contactsController';
import express from 'express';
  
const contactRouter = express.Router();
  
contactRouter.get('/',getAllContacts);
  
contactRouter.get('/:ContactId',getOneContact);
  
contactRouter.post('/', createOneContact);
  
contactRouter.patch('/:ContactId', updateOneContact);
  
contactRouter.delete('/:ContactId',deleteOneContact);
  
export default contactRouter;