const db = require("../data/db-config");

function findById(id) {
  return db("upvotes")
    .where({ id }).first()
;
}

function findBy(filter) {
  return db("upvotes")
    .where(filter)
    .select("user_id", "issue_id");
}
  
async function add(upvote) {

      const [id] = await db("upvotes").insert(upvote);
      return { upvote_id: id}

  }


function remove(id) {
  return db("upvotes")
    .where({ id })
    .del();
}

module.exports = {
  add,
  remove,
  findBy,
  findById
};
