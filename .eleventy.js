const pluginNavigation = require('@11ty/eleventy-navigation')
const pluginRss = require('@11ty/eleventy-plugin-rss')
const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const svgContents = require("eleventy-plugin-svg-contents");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPassthroughCopy("src/projects/**/*.jpg");
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

  eleventyConfig.addCollection("projects", (collections) => {
    // get all posts by tag 'post'
    return (
      collections
        .getFilteredByTag("project")
        // exclude all drafts
        .filter((post) => !Boolean(post.data.draft))
        .reverse()
    );
  });

  // return books by year
  eleventyConfig.addFilter("getBooksByYear", function (books) {
    // get finished books
    const getYears = books
      .filter((book) => book.dateFinish) // filter only finished books
      .sort((a, b) => new Date(b.dateFinish) - new Date(a.dateFinish)) // sort by finish date
      .reduce((acc, cur) => { // add them to arrays by year
        acc[new Date(cur["dateFinish"]).getFullYear()] = [
          ...(acc[new Date(cur["dateFinish"]).getFullYear()] || []),
          cur,
        ];
        return acc;
      }, {})

    // get currently reading books
    // throw them in front of the read books
    const getYearsPlusCurrent = {current: books.filter(book => book.progress), ...getYears};

    // pass clean data to get view
    const bookObject = Object.entries(getYearsPlusCurrent) // put into array
    .reverse() // sort reverse (recent first)
    .map(([year, books]) => // add meta for each year
      ({
        year: year,
        items: [...books],
        bookCount: books.length,
        pageCount: books.reduce((acc, cur) => acc + cur.pages, 0)
      })
    )
    return bookObject;
  })

  return {
    passthroughFileCopy: true,
    dir: {
      input: "src",
      output: "public",
    },
  };
};
