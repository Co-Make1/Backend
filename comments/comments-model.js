const db = require("../data/db-config");

function find() {
  return db("comments as c")
  .leftJoin("issues as i", "c.issue_id", "i.id")
    .leftJoin("users as u", "c.user_id", "u.id")
    .select(
      "c.id",
      "c.user_id",
      "u.username",
      "c.issue_id",
      "i.issue",
      "c.comment",
      "c.created_at"
    )
    .orderBy("c.created_at", "asc");
}

function findBy(filter) {
  return db("comments")
    .where(filter)
    .first("id", "username", "is_admin");
}

async function add(comment) {
  const [id] = await db("comments").insert(comment);

  return findById(id);
}

function findById(id) {
  return db("comments as c")
    .where("c.id", id)
    .leftJoin("users as u", "c.user_id", "u.id")
    .leftJoin("issues as i", "c.issue_id", "i.id")
    .orderBy("c.created_at", "asc")
    .first(
      "c.id",
      "c.user_id",
      "u.username",
      "c.issue_id",
      "i.issue",
      "c.comment",
      "c.created_at"
    );
}

function findByIssueId(id) {
  return db("comments as c")
    .where("c.issue_id", id)
    .leftJoin("users as u", "c.user_id", "u.id")
    .leftJoin("issues as i", "c.issue_id", "i.id")
    .orderBy("c.created_at", "asc")
    .select(
      "c.id",
      "c.user_id",
      "u.username",
      "c.issue_id",
      "i.issue",
      "c.comment",
      "c.created_at"
    );
}

async function update(id, body) {
  await db("comments")
    .where({ id })
    .update(body);

  return findById(id);
}

function remove(id) {
  return db("comments")
    .where({ id })
    .del();
}

module.exports = {
  add,
  find,
  findBy,
  findById,
  findByIssueId,
  update,
  remove
};
