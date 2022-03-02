const pluginNavigation = require('@11ty/eleventy-navigation')
const pluginRss = require('@11ty/eleventy-plugin-rss')
const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const svgContents = require("eleventy-plugin-svg-contents");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPassthroughCopy("src/blog/**/*.jpg")
  
  eleventyConfig.addPlugin(pluginNavigation);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.addPlugin(svgContents);
  eleventyConfig.setDataDeepMerge(true);

  // return a single book from the title
  eleventyConfig.addFilter("getBook", function (books, title) {
    return books.find(book => book.title.toLowerCase() === title.toLowerCase());
  })

  eleventyConfig.addFilter("getCurrentBooks", function (books) {
    return books.filter(book => book.progress)
  })

  eleventyConfig.addShortcode("getBooks", function(books) {
    const booksByYear = books
      .filter((book) => book.dateFinish)
      .sort((a, b) => new Date(b.dateFinish) - new Date(a.dateFinish))
      .reduce((acc, cur) => {
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
          `<div class="row column"><div class="year content">
          <h3>
            ${year}
            <span>books ${books.length}</span>
            <span>
              pages
              ${books.map((book) => book.pages).reduce((acc, cur) => acc + cur)}
            </span>
          </h3>
          <ul class="shelf">
            ${books
              .map(
                (book) =>
                  `<li class="book-container">
                    <div class="book page-count-${Math.floor(book.pages / 100)*100}">
                      <img src="/img/books/${book.image}" alt="${book.title}" />
                    </div>
                  </li>`
                )
              .join("")}
          </ul>
        </div>
        </div>`
      )
      .join("");
  })

  return {
    passthroughFileCopy: true,
    dir: {
      input: "src",
      output: "public",
    },
  };
};
