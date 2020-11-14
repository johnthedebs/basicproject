const webpack = require("webpack")
const LiveReloadPlugin = require("webpack-livereload-plugin")

const SENTRY_DSN = ""


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
          options: {
            presets: [
              "@babel/preset-env",
              ["@babel/preset-react", { "runtime": "automatic" }],
            ],
            plugins: [
              "@babel/plugin-proposal-object-rest-spread",
              ["@babel/plugin-proposal-class-properties", { "loose": true }],
              "babel-plugin-styled-components",
            ]
          }
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
      }, {
        test: /\.svg$/,
        use: [
          {
            loader: "babel-loader",
          },
          {
            loader: "react-svg-loader",
            options: {
              jsx: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(false),
      SENTRY_DSN: null,
    }),
    new LiveReloadPlugin(),
  ],
}
