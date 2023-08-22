var Airtable = require("airtable");
var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_BOOKS_BASE
);

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST",
};

const ErrorWithStatus = (code, message) => {
  return {
    statusCode: code,
    headers,
    body: JSON.stringify({ success: false, message }),
  };
};

exports.handler = async function (event, context) {
  const body = JSON.parse(event.body);

  if (Object.keys(body).length === 0 && body.constructor === Object)
    return ErrorWithStatus(400, "missing body");

  if (!Object.hasOwn(body, "updates") || !body.updates.length)
    return ErrorWithStatus(400, "missing updates");

  await base("Books").update(
    body.updates.map((book) => {
      const { id, ...fields } = book;
      return {
        id,
        fields,
      };
    }),
    function (err, records) {
      if (err) {
        console.error(err);
        return ErrorWithStatus(400, "could not update");
      }
      records.forEach(function (record) {
        console.log(record.id, record.get("isbn"));
      });
    }
  );
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      success: true,
      message: ` updated`,
    }),
  };
};
