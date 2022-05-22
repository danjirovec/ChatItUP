import knex from 'knex';
import knexfile from '../../knexfile.js';

// Připojení k databázi s knex configem
const db = knex(knexfile);

export default db;
