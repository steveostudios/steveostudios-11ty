require("dotenv").config();

const { AssetCache } = require("@11ty/eleventy-fetch");
const Airtable = require("airtable");

const fetch = function (baseId, table) {
  return new Promise((resolve, reject) => {
    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
      baseId
    );
    // let dataset = [];

    base(table)
      .select({})
      .all((err, records) => {
        const result = records.map((record) => record.fields);
        resolve(result);
      });
    // .then((data) => resolve(data));
  });

  // console.log(await dataset);
  // return await dataset;
  // .then((records) => {
  //   records.map((record, i) => {
  //     console.log(i, record._rawJson.id);
  //     dataset.push({ id: record._rawJson.id, ...record._rawJson.fields });
  //   });
  // });

  // return await dataset;
  // .eachPage(
  //   function page(records, fetchNextPage) {
  //     // This function (`page`) will get called for each page of records.

  //     records.forEach(function (record) {
  //       console.log("Retrieved", record.get("isbn"));
  //       allDatasets.push({
  //         id: record._rawJson.id,
  //         ...record._rawJson.fields,
  //       });
  //     });

  //     // To fetch the next page of records, call `fetchNextPage`.
  //     // If there are more records, `page` will get called again.
  //     // If there are no more records, `done` will get called.
  //     fetchNextPage();
  //   },
  //   function done(err) {
  //     if (err) {
  //       console.error(err);
  //     } else {
  //       return allDatasets;
  //     }
  //   }
  // );
};

module.exports = {
  getRecords: async function (base, table) {
    let asset = new AssetCache(`${base}_${table}`);
    if (asset.isCacheValid("1d")) {
      return asset.getCachedValue();
    }

    const data = await fetch(base, table);

    await asset.save(data, "json");
    // console.log("--- --- --- ---" + base + table);
    // console.log("data", data);

    return asset.getCachedValue();
  },
};
