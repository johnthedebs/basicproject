React     = require "react"
{ Route } = require "react-router"

Root     = require "../components/root"
Error404 = require "../components/error-404"


module.exports =
    <Route>
        <Route path="/" component={Root} />
        <Route path="*" component={Error404} />
    </Route>
