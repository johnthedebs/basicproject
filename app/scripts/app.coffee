_               = require "underscore"
require "./utils/underscoreMixins"

React           = require "react"
{ render }      = require "react-dom"
{ Provider }    = require "react-redux"
createLogger    = require "redux-logger"
thunkMiddleware = require "redux-thunk"

{ browserHistory, Router }    = require "react-router"
{ routeReducer, syncHistory } = require "react-router-redux"
{
    applyMiddleware
    combineReducers
    createStore
} = require "redux"

Reducers = require "./core/reducers"
Routes   = require "./core/routes"


rootReducer = combineReducers _({}).extend(
    Reducers,
    { routing: routeReducer },
)

store = createStore(
    rootReducer,
    {},
    applyMiddleware(
        createLogger(),
        syncHistory(browserHistory),
        thunkMiddleware,
    )
)

render((
    <Provider store={store}>
        <Router history={browserHistory}>
            {Routes}
        </Router>
    </Provider>
), document.getElementById("content"))
