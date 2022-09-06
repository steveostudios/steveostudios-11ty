const Parser = require('rss-parser');
const parser = new Parser();

const key = `8GEgWeB1pl6giPIrYxXXgHbzn2mQ6sWohIvhfFC0LjlNQ4V1`
const shelf = `%23ALL%23`
const sort = `date_read`

let rss_feed = `https://www.goodreads.com/review/list_rss/96507745?shelf=${shelf}&sort=${sort}`;
// let rss_feed = `https://www.goodreads.com/review/list_rss/96507745?key=${key}&shelf=${shelf}`;

// let rss_feed = `http://www.goodreads.com/user_status/list/96507745?format=rss`

module.exports = async function() {
  const parsed = await parser.parseURL(rss_feed);
  // console.log(parsed)
  // const json = parsed.items.map((item => {
  //   const contentArray = item.content.split("/\n' +");
  //   return {
  //     title: item.title,
  //   }
  // }))
	return parsed;
};

// https://www.goodreads.com/review/list_rss/96507745?key=8GEgWeB1pl6giPIrYxXXgHbzn2mQ6sWohIvhfFC0LjlNQ4V1&shelf=%23ALL%23
// https://www.goodreads.com/review/list_rss/96507745?key=8GEgWeB1pl6giPIrYxXXgHbzn2mQ6sWohIvhfFC0LjlNQ4V1&shelf=%23ALL%23