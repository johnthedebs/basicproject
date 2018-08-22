const webpack = require("webpack")
const LiveReloadPlugin = require("webpack-livereload-plugin")

const SENTRY_PUBLIC_DSN = ""


module.exports = {
  entry: "./app/index.js",
  output: {
    filename: "app.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
          },
          {
            loader: "sass-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new LiveReloadPlugin(),
  ],
}
