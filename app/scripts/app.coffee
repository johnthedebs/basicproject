_ = require "underscore"
require "./utils/underscoreMixins"

Raven           = require "raven-js"
React           = require "react"
{ render }      = require "react-dom"
{ Provider }    = require "react-redux"
createLogger    = require "redux-logger"
thunkMiddleware = require "redux-thunk"

{ browserHistory, Router } = require "react-router"
{ routerReducer, syncHistoryWithStore } = require "react-router-redux"
{
    applyMiddleware
    combineReducers
    createStore
} = require "redux"

Reducers = require "./core/reducers"
Routes   = require "./core/routes"


if window.sentry_public_dsn
    Raven.config(window.sentry_public_dsn).install()

rootReducer = combineReducers _({}).extend(
    Reducers,
    { routing: routerReducer },
)

store = createStore(
    rootReducer,
    {},
    applyMiddleware(
        createLogger(),
        thunkMiddleware,
    )
)

history = syncHistoryWithStore(browserHistory, store)

render((
    <Provider store={store}>
        <Router history={history}>
            {Routes}
        </Router>
    </Provider>
), document.getElementById("content"))
