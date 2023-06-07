const year = (year, value, x, y, h, position) => {
  return `
    <g class="year ${year}">
      <circle class="dot" cx="${x}" cy="${y}" r="4"/>
      <text class="value" x="${x}" y="${
    y - 8
  }" text-anchor="${position}">${value}</text>
      <text class="xyear" x="${x}" y="${h + 5}">${year}</text>
    </g>
  `;
};

module.exports = {
  lineGraph: function (data, prop, options) {
    const viewBox = { w: 420, h: 180 }; // how big the SVG is
    const graphDims = { x: 5, y: 20, w: 410, h: 130 }; // how big the "graph" portion is in the SVG
    const horLinesGap = options?.gap || 5;

    // get rid of 'current' since they are not finished books
    data = data
      .filter((item) => item.year !== "current")
      .sort((a, b) => a.year - b.year);

    // get bounds (fills in years where I didn't read)
    const firstYear = data[0].year;
    const lastYear = data[data.length - 1].year;
    const steps = lastYear - firstYear + 1;

    // create array with empty dates
    const filledInBooks = Array.from({ length: steps }).map((newItem, i) => {
      const match = data.find(
        (item) => parseInt(item.year) === i + parseInt(firstYear)
      );
      return (
        match || {
          year: (i + parseInt(firstYear)).toString(),
          books: 0,
          pages: 0,
        }
      );
    });

    // boundaries
    const graphHeight = [...filledInBooks].sort((a, b) => b[prop] - a[prop])[0][
      prop
    ];
    const divisions = {
      h: graphDims.w / (steps - 1),
      v: graphDims.h / graphHeight,
    };

    // svg elements
    const horLines = [...Array(Math.ceil(graphHeight / horLinesGap))].map(
      (item, i) =>
        `<line class="horizontal" x1="${graphDims.x}" x2="${
          graphDims.w + graphDims.x
        }" y1="${
          graphDims.h - divisions.v * i * horLinesGap + graphDims.y
        }" y2="${
          graphDims.h - divisions.v * i * horLinesGap + graphDims.y
        }"></line>`
    );
    const points = filledInBooks.map((item, i) => [
      (item.year - firstYear) * divisions.h + graphDims.x,
      (graphHeight - item[prop]) * divisions.v + graphDims.y,
    ]);
    const fillPath = `${points
      .join(" ")
      .replace("NaN", filledInBooks.length * divisions.h)} ${
      graphDims.w + graphDims.x
    },${graphDims.h + graphDims.y} 0, ${graphDims.h + graphDims.y}`;
    const linePath = points
      .join(" ")
      .replace("NaN", filledInBooks.length * divisions.h);

    const years = points.map((item, i) =>
      year(
        filledInBooks[i].year,
        filledInBooks[i][prop],
        item[0],
        item[1],
        graphDims.h + graphDims.y,
        i === 0 ? "start" : i === filledInBooks.length - 1 ? "end" : "middle"
      )
    );

    return `<svg viewBox="0 0 ${viewBox.w} ${viewBox.h}" width="100%" height="${viewBox.h}">
    ${horLines}
    <polyline class="fill" points="${fillPath}"/>
    <polyline class="line" points="${linePath}"/>
    ${years}

    </svg>`;
  },
};
