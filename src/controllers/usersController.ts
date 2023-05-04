/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable indent */
/* eslint-disable max-len */
import { UserType } from '@src/@types/userType';
import { 
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser, 
} from '@src/services/usersService';
import express from 'express';

export const getAllUsers = (req: express.Request ,res: express.Response) => {
    try{
        const allUsers = getUsers();
        res.send({status: 'OK', data: allUsers});
    }catch(error){
        res.status(error?.status || 500).send({ status: 'FAILED', data: { error: error?.message || error}});
    }
};

export const getOneUser = (req: express.Request ,res: express.Response) => {
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
        const user = getUser(userId);
        res.send({status: 'OK', data: user});       
    }catch(error){
        res.status(error?.status || 500).send({ status: 'FAILED', data: { error: error?.message || error}});
    }


};

export const createOneUser = (req: express.Request ,res: express.Response) => {
    
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
        id: body.id,
        name: body.name,
        photo: body.photo,
        email: body.email,
        description: body.description,
        contact: body.contact,
        status: body.status,
    };

    try{
        const createdUser = createUser(newUser);
        res.send({status: 'OK', data: createdUser});
    }catch(error){
        res.status(error?.status || 500).send({ status: 'FAILED', data: { error: error?.message || error}});
    }
};

export const updateOneUser = (req: express.Request ,res: express.Response) => {
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
        const updatedUser = updateUser(userId,body);
        res.send({status: 'OK', data: updatedUser});        
    }catch(error){
        res.status(error?.status || 500).send({ status: 'FAILED', data: { error: error?.message || error}});
    }

};

export const deleteOneUser = (req: express.Request ,res: express.Response) => {
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
        deleteUser(userId);
        res.send({status: 'OK'});        
    }catch(error){
        res.status(error?.status || 500).send({ status: 'FAILED', data: { error: error?.message || error}});
    }

};