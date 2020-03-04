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
// async function add(upvote) {
//   try {
//     const validator = await findBy({user_id: upvote.user_id})
//     const valCheck = validator.filter(issue => issue.issue_id === upvote.issue_id && issue)
//     console.log(`valCheck`, valCheck)
//     if (valCheck.length > 0) {
//       return `User with the id of ${upvote.user_id} has already upvoted issue with id of ${upvote.issue_id}`
//     } else {
//    const [id] = await db("upvotes").insert(upvote);
//     // console.log(`FROM THE MAP: `,{upvote_id: id})
//     return {upvote_id: id}
//     }
 
//   } catch(err) {
//     next()
//   }

 

//   }
  
async function add(upvote) {

    // const validator = await findBy({user_id: upvote.user_id})
    // const valCheck = validator.filter(issue => issue.issue_id === upvote.issue_id && issue)
    // console.log(`valCheck`, valCheck)
    // if (valCheck.length === 0) {
      const [id] = await db("upvotes").insert(upvote);
      return {upvote_id: id}
  //   } else {
  //     return res.status(400).json({message: `User with the id of ${upvote.user_id} has already upvoted issue with id of ${upvote.issue_id}`})
  //   }
 
  // } catch(err) {
  //   return res.status(400).json({message: `User with the id of ${upvote.user_id} has already upvoted issue with id of ${upvote.issue_id}`})
  // }

 

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
