import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./app/store"
import "./index.css"
import { BrowserRouter, Routes, Route } from "react-router"
import { App, Test } from "./App.jsx"
import Header from "./component/Header.jsx"
import "bootstrap/dist/css/bootstrap.min.css"

const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)

  root.render(
    <StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/test" element={<Test />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
