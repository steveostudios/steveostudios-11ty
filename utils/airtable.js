require("dotenv").config();

const { AssetCache } = require("@11ty/eleventy-fetch");
const Airtable = require("airtable");

const fetch = function (baseId, table, name) {
  console.log(`fetching ${name}...`)
  return new Promise((resolve, reject) => {
    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
      baseId
    );

    base(table)
      .select({})
      .all((err, records) => {
        const result = records.map((record) => ({id: record.id, ...record.fields}));
        console.log(`${result.length} ${name} found`)
        resolve(result);
      });
  });
};

module.exports = {
  getRecords: async function (base, table, name) {
    let asset = new AssetCache(`${base}_${table}`);
    if (asset.isCacheValid("1d")) {
      console.log(`pulling ${name} from valid cache`)
      return asset.getCachedValue();
    }

    console.log('building cache...')
    const data = await fetch(base, table, name);

    await asset.save(data, "json");
    console.log('cache finished')

    return asset.getCachedValue();
  },
};
