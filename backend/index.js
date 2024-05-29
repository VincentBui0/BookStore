import express from "express";
import {PORT, mongoDBURL} from "./config.js";
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

//Middleware for parsing request body
app.use(express.json());

// Middleware to manage CORS policy
// Option 1: Permit all origins with default settings
app.use(cors());
// Option 2: Permit specific origins
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );


app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome To My Bookstore');
  });

app.use('/books', booksRoute);

  mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });