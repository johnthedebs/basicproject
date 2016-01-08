_               = require "underscore"
createLogger    = require "redux-logger"
thunkMiddleware = require "redux-thunk"

{ routeReducer } = require "redux-simple-router"

{
    applyMiddleware,
    combineReducers,
    createStore,
} = require "redux"

reducers = require "./reducers"


rootReducer = combineReducers _({}).extend(
    reducers,
    { routing: routeReducer }
)

loggerMiddleware = createLogger()

createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
)(createStore)


module.exports = (initialState) ->
    return createStoreWithMiddleware(rootReducer, initialState)
