exports.seed = async function(knex) {
  await knex("issues").del();
  await knex("issues").insert([
    {
      issue: "pothole",
      issue_description: "I'm an issue description",
      photo:
        "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
      upvotes: 364235,
      location: 60649
    },
    {
      issue: "car crash",
      issue_description: "I'm an issue description",
      photo:
        "https://images.unsplash.com/photo-1543393716-375f47996a77?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
      upvotes: 3,
      location: 60619
    }
  ]);
};
