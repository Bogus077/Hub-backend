'use strict';

import express, { Application, Request, response, Response } from 'express'
import { router as UserRouter } from "./routes/user.router";
import { router as AuthRouter } from './routes/auth.router';
import { router as KidRouter } from './routes/kid.router';
import { router as TaskRouter } from './routes/task.router';
import { serverConfig } from './config/config';
import cors from 'cors';
const app = express();
import http from 'http';
const server = http.createServer(app);
import { Server, Socket } from "socket.io";
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

app.use(cors());
app.use('/user', UserRouter);
app.use('/auth', AuthRouter);
app.use('/kid', KidRouter);
app.use('/task', TaskRouter);
app.get('/', (request, response) => {
  response.send('Hello, Hackerman! Welcome to KKGame-Backend');
});

server.listen(serverConfig);

console.log(`App started on ${serverConfig.port}`);
