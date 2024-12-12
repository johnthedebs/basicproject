import * as Sentry from "@sentry/browser"
import { createRoot } from "react-dom/client"
import {GlobalStyles} from "twin.macro"
import App from "./app"

if (PRODUCTION) { Sentry.init({dsn: SENTRY_DSN}) }

const container = document.getElementById("root")
if (!container) throw new Error("Failed to find root element")

const root = createRoot(container)
root.render(
  <>
    <GlobalStyles />
    <App />
  </>
)
