/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable indent */
import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { User } from '@src/model/model';

export const loginRouter = express.Router();

loginRouter.post(
    '/login',
    async (req, res, next) => {
      passport.authenticate(
        'login',
        async (err: any, user: User) => {
          try {
            if (err || !user) {
              const error = new Error('An error occurred.');
  
              return next(error);
            }
  
            req.login(
              user,
              { session: false },
              async (error) => {
                if (error) return next(error);
  
                const body = { email: user.email, password: user.password };
                const token = jwt.sign({ user: body }, 'TOP_SECRET');
  
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