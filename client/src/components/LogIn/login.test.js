import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import Login from "./LogIn";

test("renders login content", () => {
  const component = render(<Login />);
});
