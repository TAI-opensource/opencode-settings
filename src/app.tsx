import "./app.css"
import { Router, Route } from "@solidjs/router"
import SettingsPage from "./routes/index"

export default function App() {
  return (
    <Router>
      <Route path="/" component={SettingsPage} />
    </Router>
  )
}
