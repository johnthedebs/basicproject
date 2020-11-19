const webpack = require("webpack")
const CopyPlugin = require("copy-webpack-plugin")

const SENTRY_DSN = ""


module.exports = {
  entry: "./app/index.js",
  output: {
    filename: "app.js",
    path: __dirname + "/../dist",
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
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Postcss does its thing
          "postcss-loader",
        ],
      },
      {
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
    new CopyPlugin({
      patterns: [
        {
          from: "./app/public",
          to: "public",
        },
      ],
    }),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true),
      SENTRY_DSN: JSON.stringify(SENTRY_DSN),
    }),
  ],
}
