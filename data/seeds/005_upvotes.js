exports.seed = async function(knex) {
  await knex("upvotes").truncate();
  await knex("upvotes").insert([
    {
      id: 1,
      upvotes: 1,
      user_id: 1,
      issue_id: 1
    },
    {
      id: 2,
      upvotes: 1,
      user_id: 2,
      issue_id: 2
    },
    {
      id: 3,
      upvotes: 1,
      user_id: 2,
      issue_id: 1
    }
  ]);
};
