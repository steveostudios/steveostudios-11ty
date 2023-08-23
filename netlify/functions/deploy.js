import fetch from "node-fetch";

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
  if (!Object.hasOwn(body, "code") || body.code.length !== 4)
    return ErrorWithStatus(400, "authentication error");
  if (parseInt(body.code) !== parseInt(process.env.NETLIFY_FUNCTIONS_CODE))
    return ErrorWithStatus(400, "authentication error 2");

  const response = await fetch(process.env.NETLIFY_BUILD_HOOK, {
    method: "POST",
    mode: "cors",
    header: {
      Origin: "*",
      "Access-Control-Request-Method": "POST",
    },
  });

  console.log(response.status);

  if (response.status !== 200)
    return ErrorWithStatus(400, "netlify deploy failed");

  return await {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      success: true,
      message: `site deployed`,
    }),
  };
};
