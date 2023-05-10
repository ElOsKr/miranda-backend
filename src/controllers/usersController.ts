import { UserType } from '@src/@types/userType';
import { 
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser, 
} from '@src/services/usersService';
import express from 'express';
import { uuid } from 'uuidv4';
import bcrypt from 'bcrypt';

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
        !body.user_name||
        !body.user_password||
        !body.user_photo||
        !body.user_email||
        !body.user_description||
        !body.user_contact||
        (!body.user_status && typeof body.user_status !== "boolean")
    ){
        res.status(400).send({
            status: 'Failed',
            data: {
                error: 'Cannot create object',
            },
        });
    }
    
    for ( const key in body ){
        if(!body[key] && body.user_status !== false){
            res.status(400).send({
                status: 'Failed',
                data: {
                    error: 'missing params',
                },
            });
        }
    }

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(body.user_password,salt);
    console.log(password)

    const newUser: UserType = {
        user_id: uuid(),
        user_name: body.user_name,
        user_password: password,
        user_photo: body.user_photo,
        user_email: body.user_email,
        user_description: body.user_description,
        user_contact: body.user_contact,
        user_status: body.user_status,
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