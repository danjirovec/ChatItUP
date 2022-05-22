import bcrypt from 'bcrypt';
import db from '../config/db.js';
import {
  createRoom,
  deleteRoomById,
  getRoomById,
} from '../repositories/roomRepository.js';
import {
  createUser,
  getUserByName,
  getUserByToken,
} from '../repositories/userRepository.js';

export const renderRegisterPage = (req, res) => {
  if (req.cookies.token) {
    return res.redirect('/rooms');
  }

  return res.render('register');
};

export const logout = async (req, res) => {
  res.clearCookie('token');
  return res.redirect('/');
};

export const login = async (req, res) => {
  const user = await getUserByName(req.body.name);
  if (!user) return res.redirect('/');

  const passwordIsCorrect = await bcrypt.compare(req.body.password, user.hash);
  if (!passwordIsCorrect) return res.redirect('/');

  res.cookie('token', user.token);

  return res.redirect('/rooms');
};

export const registerUser = async (req, res) => {
  const { name, password } = req.body;

  const user = await createUser(name, password);

  // Set the token cookie to the users token
  res.cookie('token', user.token);

  return res.redirect('/rooms');
};

export const renderRoomsPage = async (req, res) => {
  const { token } = req.cookies;

  const user = await getUserByToken(token);
  const allRooms = db('rooms').select('*')

  if (req.query.search) {
    allRooms.whereLike('name', `%${req.query.search}%`)
  }

  const rooms = await allRooms

  return res.render('rooms', { rooms, user });
};

export const addRoom = async (req, res) => {
  const { token } = req.cookies;
  const { name, password } = req.body;

  const user = await getUserByToken(token);

  await createRoom(name, password, user.id);

  return res.redirect('/rooms');
};

export const removeRoom = async (req, res) => {
  const id = Number(req.params.id);

  await deleteRoomById(id);

  return res.redirect('/rooms');
};

export const connectToRoom = async (req, res) => {
  const { token } = req.cookies;
  const { password } = req.body;
  const id = Number(req.params.id);

  const user = await getUserByToken(token);
  const room = await getRoomById(id);

  if (room.password === password) {
    return res.render('room', { room, user });
  }

  return res.redirect('/');
};
