const db = require("../data/db-config");

async function find() {
  const issues = await db("issues")
  const issuesArr = await issues.map(async issue => await findById(issue.id))
  return Promise.all(issuesArr)
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

async function findById(id) {
  const issue = await db("issues as i")
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
      "i.user_id",
      "u.username",
      "i.created_at"
    )
    const upvotesArr = await db("upvotes as up").where("up.issue_id", id).select("up.upvotes").orderBy("up.upvotes", "desc")
    const total_upvotes = upvotesArr.length

    const upvotes = await db("issues as i")
    .where("i.id", id)
    .leftJoin("upvotes as up", "up.issue_id", "i.id")
    .leftJoin("users as u", "up.user_id", "u.id")
    .select(
      "up.id as upvote_id",
      "up.user_id",
      "u.username"
    )
    .orderBy("up.user_id", "asc");
    if (!upvotes[0].user_id) {
      return {issue, upvotes: "no upvotes yet yet"}
    } else {
      return {issue, total_upvotes, upvotes}
    }
    
}

async function findByUserId(id) {
  const issue = await db("issues as i")
    .where("i.user_id", id)
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
      "i.user_id",
      "u.username",
      "i.created_at"
    )
    const upvotesArr = await db("upvotes as up").where("up.issue_id", id).select("up.upvotes").orderBy("up.upvotes", "desc")
    const total_upvotes = upvotesArr.length

    const upvotes = await db("issues as i")
    .where("i.id", id)
    .leftJoin("upvotes as up", "up.issue_id", "i.id")
    .leftJoin("users as u", "up.user_id", "u.id")
    .select(
      "up.id as upvote_id",
      "up.user_id",
      "u.username"
    )
    .orderBy("up.user_id", "asc");
    if (!upvotes[0].user_id) {
      return {issue, upvotes: "no upvotes yet yet"}
    } else {
      return {issue, total_upvotes, upvotes}
    }
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
