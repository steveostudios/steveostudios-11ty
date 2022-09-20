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

  const year = (year, value, x, y, h, position) => {
    return `
      <g class="year ${year}">
        <circle class="dot" cx="${x}" cy="${y}" r="4"/>
        <text class="value" x="${x}" y="${y - 8}" text-anchor="${position}">${value}</text>
        <text class="xyear" x="${x}" y="${h + 5}">${year}</text>
      </g>
    `;
  }

  const graphSVG = (data, prop, options) => {
    const viewBox = {w: 420, h: 180}; // how big the SVG is
    const graphDims = {x: 5, y: 20, w: 410, h: 130}; // how big the "graph" portion is in the SVG
    const horLinesGap = options?.gap || 5;

    // get rid of 'current' since they are not finished books
    data = data.filter(item => item.year !== "current").sort((a,b) => a.year - b.year)
    
    // get bounds (fills in years where I didn't read)
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
    const divisions = {h: graphDims.w / (steps - 1), v: graphDims.h / graphHeight};

    // svg elements
    const horLines = [...Array(Math.ceil(graphHeight /horLinesGap))].map((item, i) => `<line class="horizontal" x1="${graphDims.x}" x2="${graphDims.w + graphDims.x}" y1="${graphDims.h - (divisions.v * i *horLinesGap) + graphDims.y}" y2="${graphDims.h - (divisions.v * i *horLinesGap) + graphDims.y}"></line>`)
    const points = filledInBooks.map((item, i) => [(item.year - firstYear) * divisions.h + graphDims.x, (graphHeight - item[prop]) * divisions.v + graphDims.y]);
    const fillPath = `${points.join(" ").replace("NaN", (filledInBooks.length) * divisions.h)} ${graphDims.w + graphDims.x},${graphDims.h + graphDims.y} 0, ${graphDims.h + graphDims.y}`;
    const linePath = points.join(" ").replace("NaN", (filledInBooks.length) * divisions.h)

    const years = points.map((item, i) => year(filledInBooks[i].year, filledInBooks[i][prop], item[0], item[1], graphDims.h + graphDims.y, i === 0 ? "start" : i === filledInBooks.length - 1 ? "end" : "middle"))
    console.log(years);

    return `<svg viewBox="0 0 ${viewBox.w} ${viewBox.h}" width="100%" height="${viewBox.h}">
    ${horLines}
    <polyline class="fill" points="${fillPath}"/>
    <polyline class="line" points="${linePath}"/>
    ${years}

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
