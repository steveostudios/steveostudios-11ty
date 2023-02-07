require("dotenv").config();
const inspect = require("util").inspect;

const pluginNavigation = require("@11ty/eleventy-navigation");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const svgContents = require("eleventy-plugin-svg-contents");
const Image = require("@11ty/eleventy-img");

const { numWithDelimiter, numToOrdinal } = require("./utils/numbers");
const { reverse, max } = require("./utils/collections");
const { lineGraph } = require("./utils/graph");
const collections = require("./utils/collections");

async function imageShortcode(src, alt, dir) {
  if (alt === undefined) {
    // You bet we throw an error on missing alt (alt="" works okay)
    throw new Error(`Missing \`alt\` on myImage from: ${src}`);
  }

  let metadata = await Image(src, {
    widths: [600],
    formats: ["jpeg"],
    outputDir: `./src/img/${dir}`,
    urlPath: `/img/${dir}`,
  });

  let data = metadata.jpeg[metadata.jpeg.length - 1];
  return `<img src="${data.url}" width="${data.width}" height="${data.height}" alt="${alt}" loading="lazy" decoding="async">`;
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPassthroughCopy("src/projects/**/*.jpg");
  eleventyConfig.addPassthroughCopy("src/blog/**/*.jpg");

  eleventyConfig.addPlugin(pluginNavigation);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.addPlugin(svgContents);
  eleventyConfig.setDataDeepMerge(true);

  // useful for debugging
  eleventyConfig.addFilter(
    "debug",
    (content) => `<pre>${inspect(content)}</pre>`
  );

  // return a single book from the title
  eleventyConfig.addFilter("getBook", function (books, title) {
    // console.log(books);
    return books.find(
      (book) => book.title.toLowerCase() === title.toLowerCase()
    );
  });

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

  eleventyConfig.addLiquidFilter("reverse", (collection) =>
    reverse(collection)
  );

  eleventyConfig.addLiquidFilter("number_with_delimiter", (num) =>
    numWithDelimiter(num)
  );

  eleventyConfig.addLiquidFilter("to_ordinal", (num) => numToOrdinal(num));

  eleventyConfig.addLiquidFilter("max", (collection, prop) =>
    max(collection, prop)
  );

  eleventyConfig.addLiquidShortcode("booksByYearSVG", (books) =>
    lineGraph(books, "bookCount")
  );

  eleventyConfig.addLiquidShortcode("pagesByYearSVG", (books) =>
    lineGraph(books, "pageCount", { gap: 1000 })
  );

  eleventyConfig.addLiquidShortcode("image", imageShortcode);

  return {
    passthroughFileCopy: true,
    dir: {
      input: "src",
      output: "public",
    },
  };
};
