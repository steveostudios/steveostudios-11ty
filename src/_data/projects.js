require("dotenv").config();

const { getRecords } = require("../../utils/airtable");

module.exports = async () => {
  const results = await getRecords(
    process.env.AIRTABLE_BASE_PROJECTS_BASE,
    process.env.AIRTABLE_BASE_PROJECTS_TABLE,
    "projects"
  );

  return results
};
