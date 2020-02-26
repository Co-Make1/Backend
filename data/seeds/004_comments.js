exports.seed = async function(knex) {
  await knex("comments").del();
  await knex.raw("ALTER SEQUENCE comments_id_seq RESTART WITH 1");
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
