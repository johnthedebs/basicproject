_               = require "underscore"
require "./utils/underscoreMixins"

React           = require "react"
{ render }      = require "react-dom"
{ Provider }    = require "react-redux"
{ Router }      = require "react-router"
createLogger    = require "redux-logger"
thunkMiddleware = require "redux-thunk"
history         = require("history/lib/createBrowserHistory")()

{
    routeReducer
    syncReduxAndRouter
} = require "redux-simple-router"

{
    applyMiddleware
    combineReducers
    createStore
} = require "redux"

Reducers = require "./core/reducers"
Routes   = require "./core/routes"


createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    createLogger(),
)(createStore)

rootReducer = combineReducers _({}).extend(
    Reducers,
    { routing: routeReducer }
)

store = createStoreWithMiddleware(rootReducer)
syncReduxAndRouter(history, store)


render((
    <Provider store={store}>
        <Router history={history}>
            {Routes}
        </Router>
    </Provider>
), document.getElementById("content"))
