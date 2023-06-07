require("dotenv").config();

const { getRecords } = require("../../utils/airtable");

module.exports = async () => {
  const results = await getRecords(
    process.env.AIRTABLE_BASE_BOOKS_BASE,
    process.env.AIRTABLE_BASE_BOOKS_TABLE,
    "books"
  );

  return results
    .map(book => ({
      ...book, 
      year: !!book["dateFinish"] ? book["dateFinish"].slice(0,4) : "",
      image: book.review_attachments ? book.review_attachments.map(att => ({
        filename: att.filename,
        url: att.url
      })) : null,
    }))
};
