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
    users.string("city").notNullable();
    users.string("state").notNullable();
    users.integer("zip_code").notNullable();
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
    issues
      .integer("user_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    issues
      .integer("hazard_level")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("hazard_levels")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    issues.timestamp("created_at").defaultTo(knex.fn.now());
  });
  await knex.schema.createTable("upvotes", upvotes => {
    upvotes.increments()
    upvotes.integer("upvotes")
    upvotes
    .integer("user_id")
    .notNullable()
    .unsigned()
    .references("id")
    .inTable("users")
    .onUpdate("CASCADE")
    .onDelete("CASCADE")
    upvotes
    .integer("issue_id")
    .notNullable()
    .unsigned()
    .references("id")
    .inTable("issues")
    .onUpdate("CASCADE")
    .onDelete("CASCADE");
    upvotes.timestamp("created_at").defaultTo(knex.fn.now())
  })
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
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("comments");
  await knex.schema.dropTableIfExists("upvotes");
  await knex.schema.dropTableIfExists("issues");
  await knex.schema.dropTableIfExists("hazard_levels");
  await knex.schema.dropTableIfExists("users");
};