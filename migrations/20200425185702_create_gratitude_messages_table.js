
exports.up = function(knex) {
  return knex.schema.createTable('gratitude_messages', (table) => {
    table.increments('id').primary();
    table.text('body').notNullable();
    table.text('first_name').notNullable();
    table.text('location').notNullable();
    table.timestamp('created_at', { precision: 6 }).defaultTo(knex.fn.now(6));
    table.timestamp('updated_at', { precision: 6 }).defaultTo(knex.fn.now(6));
  });
};

exports.down = function(knex) {
  return knex.schema.droptable('gratitude_messages');
};
