import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import { BrowserRouter as Router } from "react-router-dom";
import SignUp from "../Components/SignUp";
import userEvent from "@testing-library/user-event";

describe("Testing the sign-up feature", () => {
  test("Rendering of the fields", () => {
    render(
      <Router>
        <SignUp />
      </Router>
    );
    expect(screen.getByLabelText(/User name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  test("Testing for the input in the fields", () => {
    render(
      <Router>
        <SignUp />
      </Router>
    );

    const nameInput = screen.getByLabelText(/user name/i) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(
      /Password/i
    ) as HTMLInputElement;

    userEvent.type(nameInput, "string");
    userEvent.type(passwordInput, "string");

    expect(nameInput).toHaveValue("string");
    expect(passwordInput).toHaveValue("string");
  });
});
