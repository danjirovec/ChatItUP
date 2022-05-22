import db from '../config/db.js';

export const createRoom = async (name, password, creatorId) => {
  const ids = await db('rooms').insert({ name, password, creatorId });
  const room = await db('rooms').where('id', ids[0]).first();

  return room;
};

export const getRooms = async () => {
  const rooms = await db('rooms').select('*');
  return rooms;
};

export const deleteRoomById = async (id) => {
  await db('rooms').delete().where('id', id);
};

export const getRoomById = async (id) => {
  const room = await db('rooms').where('id', id).first();
  return room;
};
