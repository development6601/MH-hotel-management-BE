import express from 'express'
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}));

import authRouter from './routes/auth.routes.js';
app.use('/api/auth', authRouter);

import roomRouter from './routes/room.routes.js';
app.use('/api/room', roomRouter);

export default app;