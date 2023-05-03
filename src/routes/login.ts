/* eslint-disable node/no-process-env */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable indent */
import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret_token = process.env.SECRET_KEY || '';

export const loginRouter = express.Router();

loginRouter.post(
    '/login',
    async (req, res, next) => {
      passport.authenticate(
        'login',
        async (err: any, user: any) => {
          try {
            if (err) {
              const error = new Error('An error occurred.');
  
              return next(error);
            }

            if(!user){
                const error = new Error('No user');
  
                return next(error);
            }
  
            req.login(
              user,
              { session: false },
              async (error) => {
                if (error) return next(error);
  
                const body = { _id: user._id, email: user.email};
                const token = jwt.sign({ user: body }, secret_token);
  
                return res.json({ token });
              },
            );
          } catch (error) {
            return next(error);
          }
        },
      )(req, res, next);
    },
  );