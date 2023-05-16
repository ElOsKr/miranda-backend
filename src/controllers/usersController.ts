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
import { userSchema } from '@src/util/validate/usersValidate';

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
        !body.name||
        !body.password||
        !body.photo||
        !body.email||
        !body.description||
        !body.contact||
        (!body.status && typeof body.status !== "boolean")
    ){
        res.status(400).send({
            status: 'Failed',
            data: {
                error: 'Cannot create object',
            },
        });
    }
    
    for ( const key in body ){
        if(!body[key] && body.status !== false){
            res.status(400).send({
                status: 'Failed',
                data: {
                    error: 'missing params',
                },
            });
        }
    }

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(body.password,salt);
    console.log(password)

    const newUser: UserType = {
        id: uuid(),
        name: body.user_name,
        password: password,
        photo: body.user_photo,
        email: body.user_email,
        description: body.user_description,
        contact: body.user_contact,
        status: body.user_status,
    };

    try{
        await userSchema.validateAsync(newUser)
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
        if(body.user_id){
            throw new Error("Cannot update user_id")
        }
        await userSchema.validateAsync(body)
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