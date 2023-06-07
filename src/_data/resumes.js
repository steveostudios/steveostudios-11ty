require("dotenv").config();

const { getRecords } = require("./../../utils/airtable");

module.exports = async () => {
  const results = await getRecords(
    process.env.AIRTABLE_BASE_RESUMES_BASE,
    process.env.AIRTABLE_BASE_RESUMES_TABLE,
    "resumes"
  );

  return results.filter(resume => resume.active);
};
