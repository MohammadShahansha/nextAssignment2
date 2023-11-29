// const express = require("express");
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRouts } from './app/modules/users/users.route';
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

app.use('/api/users', userRouts);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
