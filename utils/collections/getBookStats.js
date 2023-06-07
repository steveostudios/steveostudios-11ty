const getStats = (collectionApi) => {
  const books = collectionApi.getAll()[0].data.books.sort((a, b) => new Date(b.dateFinish) - new Date(a.dateFinish));
  
  // create array of years with their book/page stats.
  // -- used for graphs, stats, and "shelves"
  const yearStats = Object.entries(books
    .filter((book) => book.dateFinish) // filter only finished books

    .sort((a, b) => new Date(b.dateFinish) - new Date(a.dateFinish)) // sort by finish date
    .reduce((acc, cur) => {
      // add them to arrays by year
      acc[new Date(cur["dateFinish"]).getFullYear()] = [
        ...(acc[new Date(cur["dateFinish"]).getFullYear()] || []),
        cur,
      ];
      return acc;
    }, {})) // put into array
  .reverse() // sort reverse (recent first)
  .map(
    (
      [year, books] // add meta for each year
    ) => ({
      year: parseInt(year),
      books: books.length,
      pages: books.reduce((acc, cur) => acc + cur.pages, 0),
    })
  );
      
  // Most
  const mostBooks = [...yearStats].sort((a,b) => b.books - a.books)[0];
  const mostPages = [...yearStats].sort((a,b) => b.pages - a.pages)[0];
  const mostBooksBooks = mostBooks.books;
  const mostBooksYear = mostBooks.year;
  const mostPagesPages = mostPages.pages;
  const mostPagesYear = mostPages.year;

  // This Year
  const now = new Date().getFullYear();
  const thisYear = books.filter(book => book.year === now.toString());
  const thisYearBooks = thisYear.length;
  const thisYearPages = thisYear.reduce((acc, cur) => acc + cur.pages, 0);
  const thisYearBooksRank = yearStats.filter((year) => year.books > yearStats.find((item) => item.year === now).books).length;
  const thisYearPagesRank = yearStats.filter((year) => year.pages > yearStats.find((item) => item.year === now).pages).length;
  
  // Current
  const currentlyReading = books.filter(book => book.progress && !book.dateFinish);
  const currentlyReadingBooks = currentlyReading.length;
  const currentlyReadingPages = currentlyReading.reduce((acc, cur) => acc + cur.pages, 0);
  const currentlyReadingProgress = currentlyReading.reduce((acc, cur) => acc + cur.progress, 0);

  // Totals
  const total = books.filter(book => book.dateFinish);
  const totalBooks = total.length
  const totalPages = total.reduce((acc, cur) => acc + cur.pages, 0);

  return {
    mostBooksBooks,
    mostBooksYear,
    mostPagesPages,
    mostPagesYear,
    thisYearBooks,
    thisYearPages,
    thisYearBooksRank,
    thisYearPagesRank,
    currentlyReadingBooks,
    currentlyReadingPages,
    currentlyReadingProgress,
    totalBooks,
    totalPages,
    yearStats
  }
} 

module.exports = {
  getStats: getStats
}