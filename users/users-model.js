const bcrypt = require("bcryptjs");

const db = require("../data/db-config");

function find() {
  return db("users").select("id", "username");
}

function findBy(filter) {
  return db("users")
    .where(filter)
    .first("id", "password");
}

async function add(user) {
  const [id] = await db("users").insert(user);

  return findById(id);
}

function findById(id) {
  return db("users")
    .where({ id })
    .first(
      "id",
      "first_name",
      "last_name",
      "username",
      "email",
      "city",
      "state",
      "zip_code",
      "is_admin",
      "created_at"
    );
}

function remove(id) {
  return db("users")
    .where({ id })
    .del();
}

module.exports = {
  add,
  find,
  findBy,
  findById,
  remove
};
