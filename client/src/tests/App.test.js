import { render, screen } from "@testing-library/react";
import App from "./../App";

test("renders App", () => {
  render(<App />);
  screen.debug()
  expect(screen.getByText("LE NOTES")).toBeInTheDocument();
});
