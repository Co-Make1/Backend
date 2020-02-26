exports.seed = async function(knex) {
  await knex("hazard_levels").truncate();
  await knex("hazard_levels").insert([
    {
      hazard_level: "Severe Hazard"
    },
    {
      hazard_level: "Moderate Hazard"
    },
    {
      hazard_level: "Low Hazard"
    }
  ]);
};
