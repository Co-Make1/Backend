const bcrypt = require("bcryptjs");

exports.seed = async function(knex) {
  await knex("users").del();
  await knex.raw("ALTER SEQUENCE users_id_seq RESTART WITH 3");
  await knex("users").insert([
    {
      id: 1,
      username: "testUser",
      password: bcrypt.hashSync("password", 10),
      email: "testUser@email.com",
      first_name: "First Name (test - user)",
      last_name: "Last Name (test - user)",
      location: 60626,
      is_admin: false
    },
    {
      id: 2,
      username: "testAdmin",
      password: bcrypt.hashSync("password", 10),
      email: "testAdmin@email.com",
      first_name: "First Name (test - admin)",
      last_name: "Last Name (test - admin)",
      location: 60619,
      is_admin: true
    }
  ]);
};
