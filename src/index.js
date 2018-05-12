require("babel-core/register")(
  {
    presets: ['stage-0','env']
  }
);

require("babel-polyfill");

require("./app.js");