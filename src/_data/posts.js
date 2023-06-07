require("dotenv").config();

const { getRecords } = require("../../utils/airtable");

module.exports = async () => {
  const results = await getRecords(
    process.env.AIRTABLE_BASE_POSTS_BASE,
    process.env.AIRTABLE_BASE_POSTS_TABLE,
    "posts"
  );

  return results
    .filter(post => post.published)
    .map(post => ({
      ...post,
      image: post.attachments ? post.attachments.map(att => ({
        filename: att.filename,
        url: att.url
      })) : null
    }))
};
