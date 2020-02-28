const db = require("../data/db-config");

function find() {
  return db("issues as i")
    .leftJoin("users as u", "i.user_id", "u.id")
    .leftJoin("hazard_levels as h", "i.hazard_level", "h.id")
    .select(
      "i.id",
      "i.issue",
      "i.issue_description",
      "i.photo",
      "h.hazard_level",
      "i.city",
      "i.state",
      "i.zip_code",
      "i.upvotes",
      "i.user_id",
      "u.username",
      "i.created_at"
    )
    .orderBy("i.upvotes", "desc");
}

async function findBy(filter) {
  const filtered = await db("issues")
    .where(filter)
    .first();

  return findById(filtered.id);
}

async function add(issue) {
  const [id] = await db("issues").insert(issue);

  return findById(id);
}

function findById(id) {
  return db("issues as i")
    .where("i.id", id)
    .leftJoin("users as u", "i.user_id", "u.id")
    .leftJoin("hazard_levels as h", "i.hazard_level", "h.id")
    .first(
      "i.id",
      "i.issue",
      "i.issue_description",
      "i.photo",
      "h.hazard_level",
      "i.city",
      "i.state",
      "i.zip_code",
      "i.upvotes",
      "i.user_id",
      "u.username",
      "i.created_at"
    )
    .orderBy("i.upvotes", "desc");
}

function findByUserId(id) {
  return db("issues as i")
    .where("i.user_id", id)
    .leftJoin("users as u", "i.user_id", "u.id")
    .leftJoin("hazard_levels as h", "i.hazard_level", "h.id")
    .select(
      "i.id",
      "i.issue",
      "i.issue_description",
      "i.photo",
      "h.hazard_level",
      "i.zip_code",
      "i.upvotes",
      "i.user_id",
      "u.username",
      "i.created_at"
    )
    .orderBy("i.upvotes", "desc");
}

async function update(id, body) {
  await db("issues")
    .where({ id })
    .update(body);

  return findById(id);
}

function remove(id) {
  return db("issues")
    .where({ id })
    .del();
}

module.exports = {
  add,
  find,
  findBy,
  findById,
  findByUserId,
  update,
  remove
};
