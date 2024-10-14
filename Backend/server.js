import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDb } from './Config/db.js'; 
import userRouter from './Routes/UserRoute.js';
import formRouter from './Routes/FormRoute.js';
import otpRouter from './Routes/OtpRouter.js'; 

dotenv.config(); 

// App config
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Increase the listener limit to avoid memory leak warnings
process.setMaxListeners(20);

// DB connection
connectDb()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });

// API endpoints
app.use('/api', userRouter);
app.use('/api/form', formRouter);
app.use('/images', express.static('uploads'));
app.use('/api/otp', otpRouter); 

app.get('/', (req, res) => res.send("Hello, it's working!"));

app.listen(port, () => console.log(`Server is running on port ${port}`));
