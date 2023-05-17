import express from 'express';
import bookingRouter from './routes/bookings';
import bodyParser from 'body-parser';
import passport from 'passport';
import cors from 'cors';
import { loginRouter } from './routes/login';
import { router } from './routes/secureRoute';
import'./auth/auth';
import userRouter from './routes/users';
import contactRouter from './routes/contacts';
import roomRouter from './routes/rooms';

const app = express();

app.use(cors());

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false}));

app.use(bodyParser.json());

app.use('/', loginRouter);

app.use('/bookings', passport.authenticate('jwt', { session: false }),bookingRouter);

app.use('/users', passport.authenticate('jwt', { session: false }),userRouter);

app.use('/contacts', passport.authenticate('jwt', { session: false }),contactRouter);

app.use('/rooms', passport.authenticate('jwt', { session: false }),roomRouter);

app.get('/', (req,res)=>{
  res.send('Working');
});

app.use('/user', passport.authenticate('jwt', { session: false }), router);

export default app;