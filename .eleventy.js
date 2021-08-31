const pluginNavigation = require('@11ty/eleventy-navigation')
const pluginRss = require('@11ty/eleventy-plugin-rss')
const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const markdownIt = require("markdown-it");
const markdownitlinkatt = require("markdown-it-link-attributes");
const markdownItAnchor = require("markdown-it-anchor");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("css");

  	eleventyConfig.addPlugin(pluginNavigation);
    eleventyConfig.addPlugin(pluginRss);
    eleventyConfig.addPlugin(pluginSyntaxHighlight);

    eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.setTemplateFormats([
    "liquid",
    "md",
    "jpg",
    "png",
    "svg",
    "css", // css is not yet a recognized template extension in Eleventy
  ]);

  // eleventyConfig.addLayoutAlias("post", "base.liquid");

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
  };
};
