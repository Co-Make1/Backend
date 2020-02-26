exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("issue_comment");
  await knex.schema.dropTableIfExists("issues");
  await knex.schema.dropTableIfExists("hazard_levels");
  await knex.schema.dropTableIfExists("comments");
  await knex.schema.dropTableIfExists("users");
};
