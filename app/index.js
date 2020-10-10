import * as Sentry from "@sentry/browser"
if (PRODUCTION) { Sentry.init({dsn: SENTRY_DSN}) }

import React from "react"
import ReactDOM from "react-dom"

import App from "./app"


ReactDOM.render(<App />, document.getElementById("root"))
