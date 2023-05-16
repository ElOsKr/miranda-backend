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
  
contactRouter.get('/:contactId',getOneContact);
  
contactRouter.post('/', createOneContact);
  
contactRouter.patch('/:contactId', updateOneContact);
  
contactRouter.delete('/:contactId',deleteOneContact);
  
export default contactRouter;