exports.seed = async function(knex) {
  await knex("comments").del();
  await knex("comments").insert([
    {
      comment: "I'm the first comment."
    },
    {
      comment: "I'm the second comment."
    },
    {
      comment: "I'm the third comment."
    }
  ]);
};
