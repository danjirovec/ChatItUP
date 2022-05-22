import cookieParser from 'cookie-parser';
import express from 'express';
import indexRouter from './routes/indexRoutes.js';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'ejs');

app.use('/', indexRouter);

export default app;
