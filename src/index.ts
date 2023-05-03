import express from 'express';
import bookingRouter from '@src/routes/bookings';
import bodyParser from 'body-parser';


const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req,res)=>{
  res.send('Working');
});

app.use(bodyParser.json());

app.use('/api/bookings',bookingRouter);

app.listen(PORT, ()=> {
  console.log(`Listening on port ${PORT}`);
});