import React from "react";
import { test, expect } from "vitest";
import { screen, render } from "@testing-library/react";
import Container from "./Container";

// Bernardo de la Sierra Rabago
test("render container correctly with children", () => {
  render(
    <Container>
      <div>Test Child</div>
    </Container>
  );

  const childElement = screen.getByText("Test Child");
  expect(childElement).toBeInTheDocument();
});

test("container has correct class names", () => {
  render(
    <Container>
      <div>Test Child</div>
    </Container>
  );

  const containerElement = screen.getByText("Test Child").parentElement;
  expect(containerElement).toHaveClass(
    "max-w-[2520px]",
    "mx-auto",
    "xl:px-20",
    "md:px-10",
    "sm:px-2",
    "px-4"
  );
});
