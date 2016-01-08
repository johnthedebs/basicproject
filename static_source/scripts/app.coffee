_     = require "underscore"
React = require "react"

{ render }             = require "react-dom"
{ Provider }           = require "react-redux"
{ Route, Router }      = require "react-router"
{ syncReduxAndRouter } = require "redux-simple-router"

history  = require("history/lib/createBrowserHistory")()

require "./utils/underscoreMixins"

configureStore = require "./configureStore"

App      = require "./components/app"
Error404 = require "./components/error-404"


store = configureStore({
  todos: []
})

syncReduxAndRouter(history, store)


render((
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App} />
            <Route path="*" component={Error404} />
        </Router>
    </Provider>
), document.getElementById("content"))
