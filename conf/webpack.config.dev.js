const config = require("./webpack.config.js")

const webpack = require("webpack")
const CopyPlugin = require("copy-webpack-plugin")
const LiveReloadPlugin = require("webpack-livereload-plugin")


const SENTRY_DSN = ""

config.cache = { type: "filesystem" }
config.output.path = __dirname + "/../dist-dev"
config.plugins = [
  new CopyPlugin({
    patterns: [
      {
        from: "./app/public",
        to: "public",
      },
    ],
  }),
  new webpack.DefinePlugin({
    PRODUCTION: JSON.stringify(false),
    SENTRY_DSN: JSON.stringify(SENTRY_DSN),
  }),
  new LiveReloadPlugin(),
]


module.exports = config
