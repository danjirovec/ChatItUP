import bcrypt from 'bcrypt';
import crypto from 'crypto';
import db from '../config/db.js';

export const createUser = async (name, password) => {
  const hash = await bcrypt.hash(password, 10);
  const token = crypto.randomBytes(16).toString('hex');

  const ids = await db('users').insert({ name, hash, token });
  const user = await db('users').where('id', ids[0]).first();

  return user;
};

export const getUserByToken = async (token) => {
  const user = await db('users').where({ token }).first();
  return user;
};

export const getUserByName = async (name) => {
  const user = await db('users').where({ name }).first();
  return user;
};
