require("dotenv").config();

const { AssetCache } = require("@11ty/eleventy-fetch");
const Airtable = require("airtable");

const fetch = function (baseId, table) {
  return new Promise((resolve, reject) => {
    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
      baseId
    );

    base(table)
      .select({})
      .all((err, records) => {
        const result = records.map((record) => record.fields);
        resolve(result);
      });
  });
};

module.exports = {
  getRecords: async function (base, table) {
    let asset = new AssetCache(`${base}_${table}`);
    if (asset.isCacheValid("1d")) {
      return asset.getCachedValue();
    }

    const data = await fetch(base, table);

    await asset.save(data, "json");

    return asset.getCachedValue();
  },
};
