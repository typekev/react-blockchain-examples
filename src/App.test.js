import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

describe("tests general render", () => {
  test("renders generate block button", () => {
    const { getByText } = render(<App />);
    const buttonElement = getByText(/generate block/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test("renders validate button", () => {
    const { getByText } = render(<App />);
    const buttonElement = getByText(/validate/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test("renders restore button", () => {
    const { getByText } = render(<App />);
    const buttonElement = getByText(/restore/i);
    expect(buttonElement).toBeInTheDocument();
  });
});
