import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { MyAppBar } from "./AppBar";

describe("HelloWorld Component", () => {
  it("render", () => {
    render(<MyAppBar title="hello" />);
    expect(screen.getByText("hello")).toBeInTheDocument();
  });
});
