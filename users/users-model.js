const bcrypt = require("bcryptjs");

const db = require("../data/db-config");

function find() {
  return db("users").select("id", "username", "is_admin");
}

function findBy(filter) {
  return db("users")
    .where(filter)
    .first("id", "username", "is_admin", "password");
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
    )
    .orderBy("zip_code", "asc");
}

async function update(id, body) {
  await db("users")
    .where({ id })
    .update(body);

  return findById(id);
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
  update,
  remove
};
