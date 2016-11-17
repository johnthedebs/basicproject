require("es6-promise").polyfill()

var _ = require("underscore")

var autoprefix = require("autoprefixer")

var cssnano = require("cssnano")

var gulp = require("gulp")

var concat = require("gulp-concat")

var gutil = require("gulp-util")

var gwebpack = require("gulp-webpack")

var imagemin = require("gulp-imagemin")

var livereload = require("gulp-livereload")

var newer = require("gulp-newer")

var postcss = require("gulp-postcss")

var sass = require("gulp-sass")

var named = require("vinyl-named")

var webpack = require("webpack")

var WebpackNotifierPlugin = require("webpack-notifier")

var paths = {
  fontInput: [],
  fontOutput: "./dist/fonts/",
  imageInput: ["./app/img/**/*.*"],
  imageOutput: "./dist/img/",
  appInput: ["./app/scripts/app.js"],
  jsOutput: "./dist/js/",
  sassInput: ["./app/styles/app.sass"],
  cssOutput: "./dist/css/",
  images: ["./app/img/**/*.*"],
  styles: ["./app/styles/**/*.{scss,sass}"],
  templates: ["./templates/**/*.html"]
}

var webpackPlugins = [new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/), new WebpackNotifierPlugin()]

var postLoaders = null

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
      test: /\.js$/,
      loader: "transform?envify"
    }
  ]
} else {
  devtool = "#inline-source-map"
  preLoaders = [
    {
      test: /\.coffee$/,
      exclude: /node_modules/,
      loader: "coffeelint-loader"
    }
  ]
}

var webpackConfig = {
  target: "web",
  watch: !gutil.env.production,
  debug: !gutil.env.production,
  devtool: devtool,
  plugins: webpackPlugins,
  resolve: {
    extensions: ["", ".js", ".cjsx", ".coffee"],
    moduleDirectories: ["node_modules"]
  },
  module: {
    preLoaders: preLoaders,
    loaders: [
      {
        test: /\.js$/,
        loader: "babel",
        query: {
          cacheDirectory: true,
          presets: ["es2015"]
        }
      }, {
        test: /\.coffee$/,
        loaders: ["coffee", "cjsx"]
      }, {
        test: /\.json$/,
        loaders: ["json"]
      }
    ],
    postLoaders: postLoaders
  }
}

if (gutil.env.production) {
  _(webpackConfig).extend({
    output: {
      sourceMapFilename: "app.js.map"
    }
  })
}

var sassConfig = {
  errLogToConsole: true,
  indentedSyntax: true,
  sourceComments: "normal"
}

var postCssConfig = [
  autoprefix({
    browsers: ["last 3 versions", "> 1%"]
  }), cssnano()
]

gulp.task("fonts", function() {
  return gulp.src(paths.fontInput).pipe(newer(paths.fontOutput)).pipe(gulp.dest(paths.fontOutput)).pipe(livereload())
})

gulp.task("images", function() {
  return gulp.src(paths.imageInput).pipe(newer(paths.imageOutput)).pipe(imagemin()).pipe(gulp.dest(paths.imageOutput)).pipe(livereload())
})

gulp.task("scripts", function() {
  return gulp.src(paths.appInput).pipe(named()).pipe(gwebpack(webpackConfig)).pipe(gulp.dest(paths.jsOutput)).pipe(livereload())
})

gulp.task("styles", function() {
  return gulp.src(paths.sassInput).pipe(sass(sassConfig)).pipe(concat("app.css")).on("error", function(e) {
    return gutil.log("Autoprefixing Error: ", e.message, e)
  }).pipe(gutil.env.production ? postcss(postCssConfig) : gutil.noop()).pipe(gulp.dest(paths.cssOutput)).pipe(livereload())
})

gulp.task("watch", function() {
  if (!gutil.env.production) {
    gulp.watch(paths.images, ["images"])
    gulp.watch(paths.styles, ["styles"])
    livereload.listen()
    return gulp.watch(paths.templates).on("change", livereload.changed)
  }
})

gulp.task("default", ["watch", "fonts", "images", "scripts", "styles"])
