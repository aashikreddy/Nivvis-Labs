import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Nivvis Labs application without crashing", () => {
  render(<App />);
  const brandElements = screen.getAllByAltText(/nivvis/i);
  expect(brandElements.length).toBeGreaterThan(0);
});
