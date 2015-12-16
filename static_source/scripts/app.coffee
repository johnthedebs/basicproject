_        = require "underscore"
React    = require "react"
ReactDOM = require("react-dom")

{ Route, Router }  = require("react-router")
history  = require("history/lib/createBrowserHistory")()

require "./utils/underscoreMixins"

API      = require "./api"
Error404 = require "./components/error-404"


App = React.createClass
    displayName : "App"

    render: ->
        <div>
            <h2>Index</h2>
        </div>


ReactDOM.render((
    <Router history={history}>
        <Route path="/" component={App} />
        <Route path="*" component={Error404} />
    </Router>
), document.getElementById("content"))
