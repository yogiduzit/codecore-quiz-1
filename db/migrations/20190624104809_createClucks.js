
exports.up = function(knex, Promise) {
  return knex.schema.createTable('clucks', table => {
    table.increments('id');
    table.string('username');
    table.text('img_url');
    table.text('content');
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('clucks');
};
