import React from "react";
import { render } from "@testing-library/react";
import Layout from "./Layout";

describe("tests Layout", () => {
  test("renders header", () => {
    const { getByText } = render(<Layout />);
    const headerElement = getByText(/react blockchain examples/i);
    expect(headerElement).toBeInTheDocument();
  });
});
