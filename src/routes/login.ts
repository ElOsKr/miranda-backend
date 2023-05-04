/* eslint-disable node/no-process-env */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable indent */
import express from 'express';
import { loginController } from '@src/controllers/loginController';

export const loginRouter = express.Router();

loginRouter.post(
    '/login',
    loginController,
  );