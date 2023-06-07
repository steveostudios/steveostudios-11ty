const Image = require("@11ty/eleventy-img");

module.exports = {
  image: async function (src, alt, dir, format) {
    if (alt === undefined) {
      // You bet we throw an error on missing alt (alt="" works okay)
      throw new Error(`Missing \`alt\` on myImage from: ${src}`);
    }

    if (format === "png") {
      let metadata = await Image(src, {
        // widths: [200],
        formats: ["png"],
        urlPath: `/img/${dir}`,
        outputDir: `./public/img/${dir}`,
      });
      
      let data = metadata.png[metadata.png.length - 1];
      return `<img src="${data.url}"  alt="${alt}" loading="lazy" decoding="async">`;
    } else {
      let metadata = await Image(src, {
        // widths: [200],
        formats: ["jpeg"],
        urlPath: `/img/${dir}`,
        outputDir: `./public/img/${dir}`,
      });
      
      let data = metadata.jpeg[metadata.jpeg.length - 1];
      return `<img src="${data.url}"  alt="${alt}" loading="lazy" decoding="async">`;
    }
  }
};
