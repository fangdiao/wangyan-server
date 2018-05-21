require("babel-core/register")(
  {
    presets: ['stage-0','env']
  }
);

require("babel-polyfill");
console.log('babel配置启动...');
require("./app.js");
