// import { act, screen } from "@testing-library/react"
import React from "react"
import { App } from "./App"
import { render, screen, fireEvent } from "@testing-library/react"
// import { renderWithProviders } from "./utils/test-utils"

test("Just some rudimentary test", () => {
  render(<App />)
  const mainElement = screen.getByRole("main")
  const divElement = screen.getByText(/main/i)
  expect(mainElement).toContainElement(divElement)
})
