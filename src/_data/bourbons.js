require("dotenv").config();

const { getRecords } = require("./../../utils/airtable");

module.exports = async () => {
  const results = await getRecords(
    process.env.AIRTABLE_BASE_BOURBON_BASE,
    process.env.AIRTABLE_BASE_BOURBON_TABLE
  );
  console.log(results);

  return results
    .filter((item) => item["Finished"] !== true)
    .sort((a, b) => (a["Name"] > b["Name"] ? 1 : -1));
};
