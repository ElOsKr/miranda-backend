import { UserType } from '@src/@types/userType';
import { 
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser, 
} from '@src/services/usersService';
import express from 'express';

export const getAllUsers = async (req: express.Request ,res: express.Response) => {
    try{
        const allUsers = await getUsers();
        res.send({status: 'OK', data: allUsers});
    }catch(error){
        res.status(error?.status || 500).send({ status: 'FAILED', data: { error: error?.message || error}});
    }
};

export const getOneUser = async (req: express.Request ,res: express.Response) => {
    const {
        params: {userId},
    } = req;
    if(!userId){
        res.status(400).send({
            status: 'FAILED',
            data: {error: 'UserId can not be empty'},
        });
    }

    try{
        const user = await getUser(userId);
        res.send({status: 'OK', data: user});       
    }catch(error){
        res.status(error?.status || 500).send({ status: 'FAILED', data: { error: error?.message || error}});
    }


};

export const createOneUser = async (req: express.Request ,res: express.Response) => {
    
    const { body } = req;

    if(
        !body.id||
        !body.name||
        !body.photo||
        !body.email||
        !body.description||
        !body.contact||
        !body.status
    ){
        res.status(400).send({
            status: 'Failed',
            data: {
                error: 'Cannot create object',
            },
        });
        return;
    }
    
    for ( const key in body ){
        if(!body[key]){
            res.status(400).send({
                status: 'Failed',
                data: {
                    error: 'missing params',
                },
            });
        }
        return;
    }

    const newUser: UserType = {
        user_id: body.id,
        user_name: body.name,
        user_password: body.password,
        user_photo: body.photo,
        user_email: body.email,
        user_description: body.description,
        user_contact: body.contact,
        user_status: body.status,
    };

    try{
        const createdUser = await createUser(newUser);
        res.send({status: 'OK', data: createdUser});
    }catch(error){
        res.status(error?.status || 500).send({ status: 'FAILED', data: { error: error?.message || error}});
    }
};

export const updateOneUser = async (req: express.Request ,res: express.Response) => {
    const {
        body,
        params: { userId },
    } = req;

    if(!userId){
        res.status(400).send({
            status: 'FAILED',
            data: {error: 'UserId can not be empty'},
        });
    }

    try{
        const updatedUser = await updateUser(userId,body);
        res.send({status: 'OK', data: updatedUser});        
    }catch(error){
        res.status(error?.status || 500).send({ status: 'FAILED', data: { error: error?.message || error}});
    }

};

export const deleteOneUser = async (req: express.Request ,res: express.Response) => {
    const {
        params: { userId },
    }= req;

    if(!userId){
        res.status(400).send({
            status: 'FAILED',
            data: {error: 'UserId can not be empty'},
        });
    }

    try{
        await deleteUser(userId);
        res.send({status: 'OK'});        
    }catch(error){
        res.status(error?.status || 500).send({ status: 'FAILED', data: { error: error?.message || error}});
    }

};