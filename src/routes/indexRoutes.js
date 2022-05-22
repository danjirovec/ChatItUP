import express from 'express';
import {
  addRoom,
  connectToRoom,
  login,
  logout,
  registerUser,
  removeRoom,
  renderRegisterPage,
  renderRoomsPage,
} from '../controllers/indexController.js';

const indexRouter = express.Router();

indexRouter.get('/', renderRegisterPage);
indexRouter.post('/register', registerUser);
indexRouter.post('/logout', logout);
indexRouter.post('/login', login);

indexRouter.get('/rooms', renderRoomsPage);
indexRouter.post('/rooms', addRoom);
indexRouter.get('/rooms/remove/:id', removeRoom);
indexRouter.post('/rooms/connect/:id', connectToRoom);

export default indexRouter;
