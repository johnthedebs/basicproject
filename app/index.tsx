import * as Sentry from "@sentry/browser"
import ReactDOM from "react-dom"
import App from "./app"

if (PRODUCTION) { Sentry.init({dsn: SENTRY_DSN}) }


ReactDOM.render(
  <App />,
  document.getElementById("root")
)
