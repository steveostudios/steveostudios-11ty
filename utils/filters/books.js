module.exports = {
  currentlyReading: function (books) {
    return books.filter((book) => book.progress < 1);
  },
  notStarted: function (books) {
    return books.filter(
      (book) =>
        !Object.hasOwn(book, "dateStart") &&
        Object.hasOwn(book, "pages") &&
        Object.hasOwn(book, "cover")
    );
  },
};
