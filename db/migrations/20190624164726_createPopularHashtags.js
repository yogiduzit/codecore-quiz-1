
exports.up = function(knex, Promise) {
  return knex.schema.createTable('hashtags', table => {
    table.increments('id');
    table.integer('count');
    table.string('hashtag');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('hashtags');
};
