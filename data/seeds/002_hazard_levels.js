exports.seed = async function(knex) {
  await knex("hazard_levels").del();
  await knex.raw("ALTER SEQUENCE hazard_levels_id_seq RESTART WITH 1");
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
