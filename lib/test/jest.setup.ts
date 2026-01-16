import "@testing-library/jest-dom";

class MockResizeObserver {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
  constructor() {}
}

Object.defineProperty(window, "ResizeObserver", {
  value: MockResizeObserver,
  writable: true,
});

Object.defineProperty(globalThis, "ResizeObserver", {
  value: MockResizeObserver,
  writable: true,
});
