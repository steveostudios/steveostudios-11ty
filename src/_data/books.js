require("dotenv").config();

const { getRecords } = require("../../utils/airtable");

module.exports = async () => {
  const results = await getRecords(
    process.env.AIRTABLE_BASE_BOOKS_BASE,
    process.env.AIRTABLE_BASE_BOOKS_TABLE
  );

  // get finished books by years
  const getbooksByYears = results
    .filter((book) => book.dateFinish) // filter only finished books
    .sort((a, b) => new Date(b.dateFinish) - new Date(a.dateFinish)) // sort by finish date
    .reduce((acc, cur) => {
      // add them to arrays by year
      acc[new Date(cur["dateFinish"]).getFullYear()] = [
        ...(acc[new Date(cur["dateFinish"]).getFullYear()] || []),
        cur,
      ];
      return acc;
    }, {});

  // get currently reading books
  // throw them in front of the read books
  const getYearsPlusCurrent = {
    current: results.filter((book) => book.progress),
    ...getbooksByYears,
  };

  // pass clean data to get view
  const years = Object.entries(getYearsPlusCurrent) // put into array
    .reverse() // sort reverse (recent first)
    .map(
      (
        [year, books] // add meta for each year
      ) => ({
        year: year,
        items: [...books],
        bookCount: books.length,
        pageCount: books.reduce((acc, cur) => acc + cur.pages, 0),
      })
    );

  const now = new Date().getFullYear();

  const bestYearBooks = [...years]
    .sort((a, b) => (a.bookCount > b.bookCount ? 1 : -1))
    .reverse()[0];
  const bestYearPages = [...years]
    .sort((a, b) => (a.pageCount > b.pageCount ? 1 : -1))
    .reverse()[0];

  const thisYear = [...years].find((item) => item.year === now.toString());

  const currentBookRank = years.filter(
    (year) =>
      year.bookCount >
      years.find((item) => item.year === now.toString()).bookCount
  ).length;

  const currentPageRank = years.filter(
    (year) =>
      year.pageCount >
      years.find((item) => item.year === now.toString()).pageCount
  ).length;

  const currentlyReadingBooks = years.find(
    (item) => item.year === "current"
  ).bookCount;

  const currentlyReadingPages = years.find(
    (item) => item.year === "current"
  ).pageCount;

  const currentlyReadingProgress = years
    .find((item) => item.year === "current")
    .items.reduce((acc, cur) => acc + cur.progress, 0);

  const totalBooks = results.filter((book) => book.dateFinish).length;

  const totalPages = results
    .filter((book) => book.dateFinish)
    .reduce((acc, cur) => acc + cur.pages, 0);

  return {
    allBooks: results,
    years: years,
    stats: {
      totalBooks: totalBooks,
      totalPages: totalPages,
      bestYearBooks: bestYearBooks,
      bestYearPages: bestYearPages,
      thisYear: thisYear,
      currentBookRank: currentBookRank,
      currentPageRank: currentPageRank,
      currentlyReadingBooks: currentlyReadingBooks,
      currentlyReadingProgress: currentlyReadingProgress,
      currentlyReadingPages: currentlyReadingPages,
    },
  };
};
