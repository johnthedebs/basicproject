import * as Sentry from "@sentry/browser"
if (PRODUCTION) { Sentry.init({dsn: SENTRY_DSN}) }

import ReactDOM from "react-dom"

import App from "./app"
import store from "./store"


ReactDOM.render(
  <App store={store} />,
  document.getElementById("root")
)
