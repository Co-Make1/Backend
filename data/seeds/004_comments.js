exports.seed = async function(knex) {
  await knex("comments").truncate();
  await knex("comments").insert([
    {
      id: 1,
      comment: "I'm the first comment.",
      issue_id: 1,
      user_id: 1
    },
    {
      id: 2,
      comment: "I'm the second comment.",
      issue_id: 1,
      user_id: 1
    },
    {
      id: 3,
      comment: "I'm the third comment.",
      issue_id: 1,
      user_id: 1
    }
  ]);
};
