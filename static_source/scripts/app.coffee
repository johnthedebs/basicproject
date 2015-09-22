# TODO: Add CSRF token to template
require "./csrf"

_      = require "underscore"
React  = require "react"
Router = require "react-router"

{ DefaultRoute, Link, NotFoundRoute, Route, RouteHandler } = Router

Error404 = require "./components/error-404"


App = React.createClass
    displayName : "App"

    render: ->
        <div>
            <h2>Index</h2>
        </div>


routes = (
    <Route name="index" path="/" handler={App}>
        <NotFoundRoute handler={Error404} />
    </Route>
)


React.initializeTouchEvents true

Router.run routes, Router.HistoryLocation, (Handler) ->
    React.render(<Handler />, document.getElementById("content"))
