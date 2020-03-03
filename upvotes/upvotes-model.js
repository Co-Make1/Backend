const db = require("../data/db-config");

function findById(id) {
  return db("upvotes")
    .where({ id })
;
}

function findBy(filter) {
  return db("upvotes")
    .where(filter)
    .select("user_id", "issue_id");
}
async function add(upvote) {

    const [id] = await db("upvotes").insert(upvote);
    // console.log(`FROM THE MAP: `,{upvote_id: id})
    return {upvote_id: id}

  }
  




function remove(id) {
  return db("comments")
    .where({ id })
    .del();
}

module.exports = {
  add,
  remove,
  findBy
};
