import * as Sentry from "@sentry/browser"
import ReactDOM from "react-dom"
import {GlobalStyles} from "twin.macro"
import App from "./app"

if (PRODUCTION) { Sentry.init({dsn: SENTRY_DSN}) }


ReactDOM.render(
  <>
    <GlobalStyles />
    <App />
  </>,
  document.getElementById("root")
)
