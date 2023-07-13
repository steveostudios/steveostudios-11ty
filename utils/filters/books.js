module.exports = {
  currentlyReading: function (books) {
    return books.filter((book) => book.progress < 1);
  },
};
