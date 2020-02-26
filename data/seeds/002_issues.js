exports.seed = async function(knex) {
  await knex("issues").truncate();
  await knex("issues").insert([
    {
      id: 1,
      issue: "testUser",
      issue_description: bcrypt.hashSync("issue_description", 10),
      photo: "testUser@photo.com",
      location: "First Name (test - user)",
      last_name: "Last Name (test - user)",
      location: 60649,
      upvotes: false,
      user_id: 1,
      hazard_level_id: 1
    },
    {
      id: 2,
      issue: "testAdmin",
      issue_description: bcrypt.hashSync("issue_description", 10),
      photo: "testAdmin@photo.com",
      location: "First Name (test - admin)",
      last_name: "Last Name (test - admin)",
      location: 60619,
      upvotes: false,
      user_id: 1,
      hazard_level_id: 1
    }
  ]);
};
