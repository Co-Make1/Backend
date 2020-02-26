exports.up = async function(knex) {
  await knex.schema.createTable("users", users => {
    users.increments();
    users
      .string("username", 128)
      .notNullable()
      .unique();
    users.string("password").notNullable();
    users
      .string("email")
      .notNullable()
      .unique();
    users.string("first_name");
    users.string("last_name");
    users.integer("location").notNullable();
    users.boolean("is_admin").defaultTo(false);
    users.timestamp("created_at").defaultTo(knex.fn.now());
  });

  await knex.schema.createTable("hazard_levels", hazards => {
    hazards.increments();
    hazards.string("hazard_level");
  });

  await knex.schema.createTable("issues", issues => {
    issues.increments();
    issues.string("issue").notNullable();
    issues.string("issue_description").notNullable();
    issues.string("photo").unique();
    issues.string("city").notNullable();
    issues.string("state").notNullable();
    issues.integer("zip_code").notNullable();
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
  });
  await knex.schema.createTable("comments", comments => {
    comments.increments();
    comments.string("comment").notNullable();
    comments
      .integer("issue_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("issues")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    comments
      .integer("user_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    comments.timestamp("created_at").defaultTo(knex.fn.now());
  });
  //   await knex.schema.createTable("issue_comment", i_c => {
  //     i_c
  //       .integer("user_id")
  //       .unsigned()
  //       .notNullable()
  //       .references("id")
  //       .inTable("users")
  //       .onUpdate("CASCADE")
  //       .onDelete("CASCADE");
  //     i_c
  //       .integer("issue_id")
  //       .unsigned()
  //       .notNullable()
  //       .references("id")
  //       .inTable("issues")
  //       .onUpdate("CASCADE")
  //       .onDelete("CASCADE");
  //     i_c
  //       .integer("comment_id")
  //       .unsigned()
  //       .notNullable()
  //       .references("id")
  //       .inTable("comments")
  //       .onUpdate("CASCADE")
  //       .onDelete("CASCADE");
  //   });
};

exports.down = async function(knex) {
  //   await knex.schema.dropTableIfExists("issue_comment");
  await knex.schema.dropTableIfExists("comments");
  await knex.schema.dropTableIfExists("issues");
  await knex.schema.dropTableIfExists("hazard_levels");
  await knex.schema.dropTableIfExists("users");
};
