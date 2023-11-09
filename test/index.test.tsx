import React from "react";
import { render } from "@testing-library/react";

import "jest-canvas-mock";

import { Button } from "../src";

describe("All tests", () => {
  it("renders on DOM", () => {
    render(<Button />);
  });
});
