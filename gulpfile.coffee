require("es6-promise").polyfill()
_          = require "underscore"
autoprefix = require "autoprefixer"
cssnano    = require "cssnano"
gulp       = require "gulp"
concat     = require "gulp-concat"
gutil      = require "gulp-util"
gwebpack   = require "gulp-webpack"
imagemin   = require "gulp-imagemin"
livereload = require "gulp-livereload"
newer      = require "gulp-newer"
postcss    = require "gulp-postcss"
sass       = require "gulp-sass"
named      = require "vinyl-named"
webpack    = require "webpack"
WebpackNotifierPlugin = require "webpack-notifier"


paths =
    # I/O paths
    fontInput   : []
    fontOutput  : "./dist/fonts/"
    imageInput  : ["./app/img/**/*.*"]
    imageOutput : "./dist/img/"
    appInput    : ["./app/scripts/app.coffee"]
    jsOutput    : "./dist/js/"
    sassInput   : ["./app/styles/app.sass"]
    cssOutput   : "./dist/css/"

    # Watch paths
    images  : ["./app/img/**/*.*"]
    scripts : ["./app/scripts/**/*.coffee"]
    styles  : [
        "./app/styles/**/*.sass"
        "./app/styles/**/*.scss"
    ]


##
## Config
##

webpackPlugins = [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    new WebpackNotifierPlugin()
]

if gutil.env.production
    process.env.NODE_ENV = "production"

    webpackPlugins.push new webpack.optimize.UglifyJsPlugin(
        compress:
            warnings: false
    )
    webpackPlugins.push new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify("production")
    })
    postLoaders = [
        test   : /\.js$/
        loader : "transform?envify"
    ]
else
    devtool = "#inline-source-map"
    preLoaders  = [
        test    : /\.coffee$/
        exclude : /node_modules/
        loader  : "coffeelint-loader"
    ]

webpackConfig =
    target  : "web"
    watch   : !gutil.env.production
    debug   : !gutil.env.production
    devtool : devtool
    plugins : webpackPlugins
    resolve :
        extensions        : ["", ".js", ".cjsx", ".coffee"]
        moduleDirectories : ["node_modules"]
    module:
        preLoaders: preLoaders
        loaders: [
            test    : /\.coffee$/
            loaders : ["coffee", "cjsx"]
        ,
            test    : /\.json$/
            loaders : ["json"]
        ]
        postLoaders: postLoaders

if gutil.env.production
    _(webpackConfig).extend
        output:
            sourceMapFilename: "app.js.map"

sassConfig =
    errLogToConsole : true
    indentedSyntax  : true
    sourceComments  : "normal"

postCssConfig = [
    autoprefix(browsers: [
        "last 3 versions"
        "> 1%"
    ])
    cssnano()
]


##
## Tasks
##

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
    gulp.src paths.appInput
        .pipe named()
        .pipe gwebpack webpackConfig
        .pipe gulp.dest paths.jsOutput
        .pipe livereload()

gulp.task "styles", ->
    gulp.src paths.sassInput
        .pipe sass sassConfig
        .pipe concat "app.css"
        .on "error", (e) -> gutil.log "Autoprefixing Error: ", e.message, e
        .pipe if gutil.env.production then postcss(postCssConfig) else gutil.noop()
        .pipe gulp.dest paths.cssOutput
        .pipe livereload()

gulp.task "watch", ->
    if not gutil.env.production
        gulp.watch paths.images, ["images"]
        gulp.watch paths.styles, ["styles"]
        livereload.listen()
        gulp.watch("./templates/**/*.html").on "change", livereload.changed

gulp.task "default", ["watch", "fonts", "images", "scripts", "styles"]
