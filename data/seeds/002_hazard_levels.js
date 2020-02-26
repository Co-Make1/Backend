exports.seed = async function(knex) {
  await knex("hazard_levels").truncate("CASCADE");
  await knex("hazard_levels").insert([
    {
      id: 1,
      hazard_level: "Severe Hazard"
    },
    {
      id: 2,
      hazard_level: "Moderate Hazard"
    },
    {
      id: 3,
      hazard_level: "Low Hazard"
    }
  ]);
};
