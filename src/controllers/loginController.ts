/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable indent */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable max-len */
import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
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

              const body = { mail: user.email, password: user.password};
              const token = jwt.sign({ user: body }, 'SECRET_KEY');

              return res.json({ token });
            },
          );
        } catch (error) {
          return next(error);
        }
      },
    )(req, res, next);
};