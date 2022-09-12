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

  eleventyConfig.addLiquidFilter("reverse", (collection) => {
    const arr = [...collection];
    return arr.reverse();
  })

  eleventyConfig.addLiquidFilter("number_with_delimiter", (num) => {
    return Number(num).toLocaleString();
  });

  eleventyConfig.addLiquidFilter("max", (collection, prop) => {
    const arr = [...collection].sort((a, b) => a[prop] > b[prop] ? 1 : -1);
    return arr.reverse()[0];
  })

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


    return {
      books: bookObject,
      finishedBooks: books.filter((book) => book.dateFinish).length,
      finishedPages: books
        .filter((book) => book.dateFinish)
        .reduce((acc, cur) => acc + cur.pages, 0),
    };
  })

  const graphSVG = (data, prop, options) => {
    const viewBox = {w: 420, h: 150};
    // get rid of 'current'
    data = data.filter(item => item.year !== "current").sort((a,b) => a.year - b.year)
    
    // get bounds
    const firstYear = data[0].year;
    const lastYear = data[data.length - 1].year;
    const steps = lastYear - firstYear + 1;

    // create array with empty dates
    const filledInBooks = Array.from({length: steps}).map((newItem, i) => {
      const match = data.find(item => parseInt(item.year) === i + parseInt(firstYear));
      return match || {year: (i + parseInt(firstYear)).toString(), items: [], bookCount: 0, pageCount: 0}
    })

    // boundaries
    const graphHeight = [...filledInBooks].sort((a,b) => b[prop] - a[prop])[0][prop];
    const divisions = {h: viewBox.w / (steps - 1), v: viewBox.h / graphHeight};
    const offset = 1;

    const horLinesGap = options?.gap || 5;

    // svg elements
    const horLines = [...Array(Math.ceil(graphHeight /horLinesGap))].map((item, i) => `<line x1="0" x2="${viewBox.w}" y1="${viewBox.h - (divisions.v * i *horLinesGap)}" y2="${viewBox.h - (divisions.v * i *horLinesGap)}" stroke="var(--grey)" stroke-width="0.5" stroke-linecap="square"></line>`)
    const points = filledInBooks.map((item, i) => [(item.year - firstYear) * divisions.h, (graphHeight - item[prop]) * divisions.v]);
    const fillPath = `${points.join(" ").replace("NaN", (filledInBooks.length + 1 + offset) * divisions.h)} ${viewBox.w },${viewBox.h} 0, ${viewBox.h}`;
    const linePath = points.join(" ").replace("NaN", (filledInBooks.length + 1 + offset) * divisions.h)

    const text = points.map((item, i) => `<text x="${item[0]}" y="${viewBox.h + 5}" style="font-size: 10px; text-orientation: mixed;writing-mode: vertical-rl; fill: var(--dark-grey);">${filledInBooks[i].year}</text>`)
    const circles = points.map((item, i) => `
    <g class="point">
      <circle cx="${item[0]}" cy="${item[1]}" r="4" stroke-width="2" stroke="var(--white)" fill="var(--dark-grey)" transform-origin="center"/>
      <text x="${item[0]}" y="${item[1] - 10}" style="font-size: 10px; fill: var(--grey);">${filledInBooks[i][prop]}</text>
    </g>`
    );

    return `<svg viewBox="-5 -5 ${viewBox.w +10} ${viewBox.h + 30}" width="${viewBox.w}" height="${viewBox.h + 30}">
    ${horLines}
    <polyline fill="var(--primary-color)" style="opacity: 0.4;" stroke-width="0" points="${fillPath}"/>
    <polyline fill="none" stroke="var(--primary-color)" stroke-width="2" points="${linePath}"/>
    ${circles}

    ${text}
    </svg>`;
  }

  eleventyConfig.addLiquidShortcode("booksByYearSVG", (books) => {
    return graphSVG(books, 'bookCount')
  })

  eleventyConfig.addLiquidShortcode("pagesByYearSVG", (books) => {
    return graphSVG(books, 'pageCount', {gap: 1000});
  })

  return {
    passthroughFileCopy: true,
    dir: {
      input: "src",
      output: "public",
    },
  };
};
