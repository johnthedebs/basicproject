_ = require "underscore"
require "./utils/underscoreMixins"

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
