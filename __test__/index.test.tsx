import { render, screen } from "@testing-library/react"
import Home from "../pages/index"

test("renders text", () => {
  render(<Home />)
  const text = screen.getByText(/im here to testing/i)
  expect(text).toBeInTheDocument()
})

test("renders login link", () => {
  render(<Home />)
  const link = screen.getByRole("link", { name: /login/i })
  expect(link).toBeInTheDocument()
})
