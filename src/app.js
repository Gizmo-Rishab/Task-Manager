import express from 'express';
import 'ejs';
import path from 'path';
import url from 'url';
import cookieParser from 'cookie-parser';
import './db/mongoose.js';
import userRouter from './routers/user.js';
import taskRouter from './routers/task.js';
import loginRouter from './routers/login.js';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../views');

// Ejs setup and custom path setup
app.set('view engine', 'ejs');
app.set('views', viewsPath);

// Common use
app.use(express.json());

// Frontend use
app.use(express.static(publicDirectoryPath));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routers
app.use(userRouter);
app.use(taskRouter);
app.use(loginRouter);

export default app;
