require("es6-promise").polyfill()

const _                     = require("underscore")
const autoprefix            = require("autoprefixer")
const cssnano               = require("cssnano")
const gulp                  = require("gulp")
const concat                = require("gulp-concat")
const gutil                 = require("gulp-util")
const gwebpack              = require("gulp-webpack")
const imagemin              = require("gulp-imagemin")
const livereload            = require("gulp-livereload")
const newer                 = require("gulp-newer")
const postcss               = require("gulp-postcss")
const sass                  = require("gulp-sass")
const named                 = require("vinyl-named")
const webpack               = require("webpack")
const WebpackNotifierPlugin = require("webpack-notifier")


const paths = {
  fontInput   : [],
  fontOutput  : "./dist/fonts/",
  imageInput  : ["./app/img/**/*.*"],
  imageOutput : "./dist/img/",
  appInput    : ["./app/scripts/app.js"],
  jsOutput    : "./dist/js/",
  sassInput   : ["./app/styles/app.sass"],
  cssOutput   : "./dist/css/",
  images      : ["./app/img/**/*.*"],
  styles      : ["./app/styles/**/*.{scss,sass}"],
  templates   : ["./templates/**/*.html"]
}

const webpackPlugins = [
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  new WebpackNotifierPlugin(),
]

let postLoaders = null
let devtool = null

if (gutil.env.production) {
  process.env.NODE_ENV = "production"
  webpackPlugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }))
  webpackPlugins.push(new webpack.DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify("production")
  }))
  postLoaders = [
    {
      test   : /\.js$/,
      loader : "transform?envify"
    }
  ]
} else {
  devtool = "#inline-source-map"
}

const webpackConfig = {
  target: "web",
  watch: !gutil.env.production,
  debug: !gutil.env.production,
  devtool,
  plugins: webpackPlugins,
  resolve: {
    extensions: ["", ".js"],
    moduleDirectories: ["node_modules"],
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel?cacheDirectory",
      },
      {
        test: /\.json$/,
        loaders: ["json"],
      },
    ],
    postLoaders
  },
}

if (gutil.env.production) {
  _(webpackConfig).extend({
    output: {
      sourceMapFilename: "app.js.map"
    }
  })
}

const sassConfig = {
  errLogToConsole: true,
  indentedSyntax: true,
  sourceComments: "normal",
}

const postCssConfig = [
  autoprefix({
    browsers: ["last 3 versions", "> 1%"]
  }),
  cssnano(),
]

gulp.task("fonts", () =>
  gulp.src(paths.fontInput)
  .pipe(newer(paths.fontOutput))
  .pipe(gulp.dest(paths.fontOutput))
  .pipe(livereload())
)

gulp.task("images", () =>
  gulp.src(paths.imageInput)
  .pipe(newer(paths.imageOutput))
  .pipe(imagemin())
  .pipe(gulp.dest(paths.imageOutput))
  .pipe(livereload())
)

gulp.task("scripts", () =>
  gulp.src(paths.appInput)
  .pipe(named())
  .pipe(gwebpack(webpackConfig))
  .pipe(gulp.dest(paths.jsOutput))
  .pipe(livereload())
)

gulp.task("styles", () =>
  gulp.src(paths.sassInput)
  .pipe(sass(sassConfig))
  .pipe(concat("app.css"))
  .on("error", e => gutil.log("Autoprefixing Error: ", e.message, e))
  .pipe(gutil.env.production ? postcss(postCssConfig) : gutil.noop())
  .pipe(gulp.dest(paths.cssOutput))
  .pipe(livereload())
)

gulp.task("watch", () => {
  if (!gutil.env.production) {
    gulp.watch(paths.images, ["images"])
    gulp.watch(paths.styles, ["styles"])
    livereload.listen()
    return gulp.watch(paths.templates).on("change", livereload.changed)
  }
})

gulp.task("default", ["watch", "fonts", "images", "scripts", "styles"])
