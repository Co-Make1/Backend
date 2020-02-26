const bcrypt = require("bcryptjs");

const db = require("../data/db-config");

function find() {
  return db("users").select("id", "username");
}

function findBy(filter) {
  return db("users")
    .select("id", "username")
    .where(filter);
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
      "location",
      "is_admin"
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
