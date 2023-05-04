/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable max-len */
import express from 'express';
import bookingRouter from '@src/routes/bookings';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';
import cors from 'cors';
import { loginRouter } from './routes/login';
import { router } from './routes/secureRoute';
import'./auth/auth';
import userRouter from './routes/users';
import contactRouter from './routes/contacts';

// async function connection() {
//   try{
//     await mongoose.connect('mongodb://127.0.0.1:27017/passport-jwt', {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     } as mongoose.ConnectOptions);

//     console.log('Connected');
//   } catch (error){
//     console.log(`Mongo connection error: ${error}`);
//   }
// }

// connection();

const app = express();

const PORT = 3000;

app.use(cors());

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false}));

app.use(bodyParser.json());

app.use('/', loginRouter);

app.use('/bookings', passport.authenticate('jwt', { session: false }),bookingRouter);

app.use('/users', passport.authenticate('jwt', { session: false }),userRouter);

app.use('/contacts', passport.authenticate('jwt', { session: false }),contactRouter);

app.get('/', (req,res)=>{
  res.send('Working');
});

app.use('/user', passport.authenticate('jwt', { session: false }), router);

app.listen(PORT);