const MarkdownIt = require("markdown-it");
const Image = require("@11ty/eleventy-img");

module.exports = {
  markdown: function (rawString, attachments, dir) {
    const mdRender = new MarkdownIt();

    mdRender.renderer.rules.image = function (tokens) {
      if (tokens.length && tokens[0].attrs) {
        const filename = tokens[0].attrs.find(
          ([key, value]) => key === "src"
        )[1];
        const url = attachments.find((att) => att.filename === filename).url;

        if (!url) return;

        const alt = "image";
        let widths = ["auto"];
        let formats = ["webp", "jpeg"];

        let options = {
          widths: [...widths, null],
          formats: [...formats, null],
          formats: ["jpeg"],
          urlPath: `/img/${dir}`,
          outputDir: `./public/img/${dir}`,
          filenameFormat: function (id, src, width, format, options) {
            return `${id}.${format}`;
          },
        };

        // generate images, while this is async we don’t wait
        Image(url, options);

        let metadata = Image.statsByDimensionsSync(
          url,
          "auto",
          "auto",
          options
        );

        let imageAttributes = {
          alt,
          sizes: "(min-width: 30em) 50vw, 100vw",
          loading: "lazy",
          decoding: "async",
        };

        // render HTML content
        let html = Image.generateHTML(metadata, imageAttributes);
        html = html.replace(/(?:width|height)="[0-9]+"/gm, "");

        if (!html) return "no image";
        return html;
      }
    };
    return mdRender.render(rawString);
  },
};
