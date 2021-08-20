module.exports = function (eleventyConfig) {
  eleventyConfig.setTemplateFormats([
    "liquid",
    // "md",
    "jpg",
    "png",
    "svg",
    "css", // css is not yet a recognized template extension in Eleventy
  ]);
  
  eleventyConfig.addPassthroughCopy("css");

  eleventyConfig.addFilter("getCurrentBooks", function (books) {
    return books.filter(book => book.progress)
  })

  eleventyConfig.addShortcode("getBooks", function(books) {
    const booksByYear = books
      .filter((book) => book.dateFinish)
      .sort((a, b) => new Date(b.dateFinish) - new Date(a.dateFinish))
      .reduce((acc, cur) => {
        console.log(acc[cur["dateFinish"]]);
        acc[new Date(cur["dateFinish"]).getFullYear()] = [
          ...(acc[new Date(cur["dateFinish"]).getFullYear()] || []),
          cur,
        ];
        return acc;
      }, {});



    return Object.entries(booksByYear)
      .reverse()
      .map(
        ([year, books]) =>
          `<div class="row column"><div class="shelf">
          <h4>
            ${year}
            <span>books ${books.length}</span>
            <span>
              pages
              ${books.map((book) => book.pages).reduce((acc, cur) => acc + cur)}
            </span>
          </h4>
          <ul class="books">
            ${books.map(
              (book) =>
                `<li>
                <img src="/img/books/${book.image}" alt="${book.title}" />
              </li>`
            ).join("")}
          </ul>
        </div>
        </div>`
      ).join("");
  })

  return {
    passthroughFileCopy: true,
  };
};
