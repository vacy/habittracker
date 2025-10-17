import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import store from "./features/saga/index.js"
import "./index.css"
import { BrowserRouter, Routes, Route } from "react-router"
import Header from "./component/Header.jsx"
import Login from "./component/Login.jsx"
import Chat from "./component/Chat.jsx"
import "bootstrap/dist/css/bootstrap.min.css"

const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)

  root.render(
    <StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </Provider>
      </BrowserRouter>
    </StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
