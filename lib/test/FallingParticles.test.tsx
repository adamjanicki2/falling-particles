import { render } from "@testing-library/react";

import FallingParticles from "../src/FallingParticles";

describe("FallingParticles", () => {
  beforeEach(() => {
    jest.spyOn(window, "requestAnimationFrame").mockImplementation(() => 0);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders a canvas inside the container", () => {
    const { container } = render(
      <FallingParticles className="particles" style={{ height: "100px" }} />
    );

    const wrapper = container.querySelector(".particles");
    const canvas = container.querySelector("canvas");

    expect(wrapper).toBeTruthy();
    expect(canvas).toBeTruthy();
  });
});
