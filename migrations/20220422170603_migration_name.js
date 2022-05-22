export const up = async (knex) => {
  await knex.schema.createTable('users', (table) => {
    table.increments('id');
    table.string('name').notNullable().unique();
    table.string('hash').notNullable();
    table.string('token');
  });

  await knex.schema.createTable('rooms', (table) => {
    table.increments('id');
    table.string('name').notNullable();
    table.string('password').notNullable();
    table.integer('creatorId').notNullable();
  });
};

export const down = async (knex) => {
  await knex.schema.dropTable('users');
  await knex.schema.dropTable('rooms');
};
