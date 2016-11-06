_ = require "underscore"
require "./utils/underscoreMixins"

Raven           = require "raven-js"
React           = require "react"
{ render }      = require "react-dom"
{ Provider }    = require "react-redux"
thunkMiddleware = require("redux-thunk").default

{ browserHistory, Router } = require "react-router"
{ routerReducer, syncHistoryWithStore } = require "react-router-redux"
{
    applyMiddleware
    combineReducers
    compose
    createStore
} = require "redux"

Reducers = require "./core/reducers"
Routes   = require "./core/routes"


if window.sentry_public_dsn
    Raven.config(window.sentry_public_dsn).install()

if process.env.NODE_ENV == "production"
    enhancer = applyMiddleware(thunkMiddleware)
else
    createLogger = require "redux-logger"
    DevTools     = require "./utils/devtools"

    enhancer = compose(
        applyMiddleware(
            createLogger(),
            thunkMiddleware,
        )
        DevTools.instrument()
    )

rootReducer = combineReducers _({}).extend(
    Reducers,
    { routing: routerReducer },
)

store = createStore(
    rootReducer,
    {},
    enhancer
)

history = syncHistoryWithStore(browserHistory, store)

render((
    <Provider store={store}>
        <Router history={history}>
            {Routes}
        </Router>
    </Provider>
), document.getElementById("content"))
