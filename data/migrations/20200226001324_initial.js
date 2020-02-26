exports.up = async function(knex) {
  await knex.schema.createTable("users", users => {
    users.increments();
    users
      .string("user_name", 128)
      .notNullable()
      .unique();
    users.string("password").notNullable();
    users
      .string("email")
      .notNullable()
      .unique();
    users.string("first_name");
    users.string("last_name");
    users
      .integer("location")
      .notNullable()
      .unique();
  });
  users.boolean("is_admin").defaultTo(false);
  users.timestamp("created_at").defaultTo(knex.fn.now());

  await knex.schema.createTable("comments", comments => {
    comments.increments();
    comments.string("comment").notNullable();
    comments.timestamp("created_at").defaultTo(knex.fn.now());
  });

  await knex.schema.createTable("hazard_levels", hazards => {
    hazards.increments();
  });

  await knex.schema.createTable("issues", issues => {
    issues.increments();
    issues.string("issue").notNullable();
    issues.string("issue_description").notNullable();
    issues.string("photo").unique();
    issues.string("location").notNullable();
    issues.integer("upvotes");
    issues
      .integer("user_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    issues
      .integer("hazard_level_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("hazard_levels")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    issues.timestamp("created_at").defaultTo(knex.fn.now());
    issues
      .integer("comment_id")
      .unsigned()
      .references("id")
      .inTable("comments")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });

  await knex.schema.createTable("issue_comment", i_c => {
    i_c
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    i_c
      .integer("issue_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("issues")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    i_c
      .integer("comment_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("comments")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("issue_comment");
  await knex.schema.dropTableIfExists("issues");
  await knex.schema.dropTableIfExists("hazard_levels");
  await knex.schema.dropTableIfExists("comments");
  await knex.schema.dropTableIfExists("users");
};
