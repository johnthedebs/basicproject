import Raven from "raven-js"
import React from "react"
import ReactDOM from "react-dom"

import App from "./app"


if (process.env.SENTRY_PUBLIC_DSN) {
  Raven.config(process.env.SENTRY_PUBLIC_DSN)
}

ReactDOM.render(<App />, document.getElementById("root"))
