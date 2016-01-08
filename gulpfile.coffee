require("es6-promise").polyfill()

_          = require "underscore"
gulp       = require "gulp"
autoprefix = require "gulp-autoprefixer"
concat     = require "gulp-concat"
gutil      = require "gulp-util"
gwebpack   = require "gulp-webpack"
imagemin   = require "gulp-imagemin"
livereload = require "gulp-livereload"
minifyCss  = require "gulp-minify-css"
newer      = require "gulp-newer"
rename     = require "gulp-rename"
sass       = require "gulp-sass"
uglify     = require "gulp-uglify"

named      = require "vinyl-named"
webpack    = require "webpack"


if gutil.env.production then process.env.NODE_ENV = "production"


paths =
    # I/O paths
    sassIncludePaths : [
        "./node_modules/bootstrap-sass/assets/stylesheets/"
    ]
    sassInput   : [
        "./static_source/styles/app.sass"
    ]
    cssOutput   : "./static_files/css/"

    fontInput   : "./node_modules/bootstrap-sass/assets/fonts/**/*.*"
    fontOutput  : "./static_files/fonts/"

    imageInput  : [
        "./static_source/img/**/*.*"
    ]
    imageOutput : "./static_files/img/"

    appInput    : [
        "./static_source/scripts/app.coffee"
    ]
    jsInput    :
        "global-deps.js" : [
            "./node_modules/raven-js/dist/raven.js"
        ]
    jsOutputDir : "./static_files/js/"

    # Watch paths
    images : [
        "./static_source/img/**/*.*"
    ]
    scripts : [
        "./static_source/scripts/**/*.coffee"
    ]
    styles : [
        "./static_source/styles/**/*.sass"
        "./static_source/styles/**/*.scss"
        "./node_modules/bootstrap-sass/assets/stylesheets/**/*.scss"
    ]


webpackConfig =
    target: "web"
    watch: true
    debug: !gutil.env.production
    plugins: [
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ]
    resolve:
        extensions: ["", ".js", ".cjsx", ".coffee"]
        moduleDirectories: ["node_modules"]
    module:
        loaders: [
            {
                test    : /\.coffee$/
                loaders : ["coffee", "cjsx"]
            }
            {
                test    : /\.json$/
                loaders : ["json"]
            }
        ]
        postLoaders: [
            {
                test   : /\.js$/
                loader : "transform?envify"
            }
        ]


gulp.task "fonts", ->
    gulp.src paths.fontInput
        .pipe newer paths.fontOutput
        .pipe gulp.dest paths.fontOutput
        .pipe livereload()


gulp.task "images", ->
    gulp.src paths.imageInput
        .pipe newer paths.imageOutput
        .pipe imagemin()
        .pipe gulp.dest paths.imageOutput
        .pipe livereload()


gulp.task "scripts", ->
    for output, inputs of paths.jsInput
        gulp.src inputs
            .pipe concat output
            .pipe uglify()
            .pipe gulp.dest paths.jsOutputDir

    if gutil.env.production
        webpackConfig = _({}).extend(webpackConfig, { watch: false })

    gulp.src paths.appInput
        .pipe named()
        .pipe gwebpack webpackConfig
        .pipe if gutil.env.production then uglify() else gutil.noop()
        .pipe gulp.dest paths.jsOutputDir
        .pipe livereload()


gulp.task "styles", ->
    sassOptions =
        errLogToConsole : true
        includePaths    : paths.sassIncludePaths
        indentedSyntax  : true
        sourceComments  : "normal"

    minifyCssOptions =
      compatibility       : "ie8"
      keepSpecialComments : 1

    gulp.src paths.sassInput
        .pipe sass sassOptions
        .pipe concat "app.css"
        .pipe autoprefix "last 3 versions", "> 1%", "ie 8"
        .on "error", (e) -> gutil.log "Autoprefixing Error: ", e.message, e
        .pipe if gutil.env.production then minifyCss(minifyCssOptions) else gutil.noop()
        .pipe gulp.dest paths.cssOutput
        .pipe livereload()


gulp.task "watch", ->
    if not gutil.env.production
        gulp.watch paths.images, ["images"]
        gulp.watch paths.styles, ["styles"]

        livereload.listen()
        gulp.watch("./templates/**/*.html").on "change", livereload.changed


gulp.task "default", ["watch", "fonts", "images", "scripts", "styles"]
