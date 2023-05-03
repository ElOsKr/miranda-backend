/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable max-len */
import express from 'express';
import bookingRouter from '@src/routes/bookings';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';
import { UserModel } from './model/model';
import { loginRouter } from './routes/login';
import { router } from './routes/secureRoute';

async function connection() {
  try{
    await mongoose.connect('mongodb://127.0.0.0:27017/passport-jwt', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);

    console.log('Connected');
  } catch (error){
    console.log(`Mongo connection error: ${error}`);
  }
}

connection();

require('./auth/auth');


const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false}));

app.use('/', loginRouter);

app.use('/user', passport.authenticate('jwt', { session: false }), router);

// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.json({ error: err });
// });

app.get('/', (req,res)=>{
  res.send('Working');
});

app.use(bodyParser.json());

app.use('/api/bookings',bookingRouter);

app.listen(PORT, ()=> {
  console.log(`Listening on port ${PORT}`);
});