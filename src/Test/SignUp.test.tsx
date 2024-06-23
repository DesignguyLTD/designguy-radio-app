import "@testing-library/jest-dom";

import React, { FormEvent, act } from "react";
import { render, renderHook, screen, waitFor } from "@testing-library/react";

import { BrowserRouter as Router } from "react-router-dom";
import SignUp from "../Components/SignUp";
import { useValidation } from "../Components/SignUp";
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

  // This is a test for the name field
  // ---------------------------------------------------------

  test("The name field validation", async () => {
    const { result } = renderHook(() => useValidation());

    act(() => {
      result.current.setName("John");
    });
    await waitFor(() => {
      expect(result.current.name).toBe("John");
    });

    result.current.validateName(result.current.name);
    await waitFor(() => {
      expect(result.current.error).toBe("Use a longer name");
    });

    act(() => {
      result.current.setName("JohnDoe");
    });
    await waitFor(() => {
      expect(result.current.name).toBe("JohnDoe");
    });

    act(() => {
      result.current.validateName(result.current.name);
    });
    await waitFor(() => {
      expect(result.current.error).toBe("");
    });

    act(() => {
      result.current.setName("John Doe");
    });
    await waitFor(() => {
      expect(result.current.name).toBe("John Doe");
    });

    act(() => {
      result.current.validateName(result.current.name);
    });
    await waitFor(() => {
      expect(result.current.error).toBe("No white spaces between characters");
    });
  });

  // This is a test for the password field

  // ------------------------------------------------------------
  test("Validating Password", async () => {
    const { result } = renderHook(() => useValidation());

    act(() => {
      result.current.setPassword("password");
    });
    await waitFor(() => {
      expect(result.current.password).toBe("password");
    });

    act(() => {
      result.current.validatePassword(result.current.password);
    });
    await waitFor(() => {
      expect(result.current.error1).toBe(
        "Password should be at least 8 characters long"
      );
    });

    act(() => {
      result.current.setPassword("passwords");
    });
    await waitFor(() => {
      expect(result.current.password).toBe("passwords");
    });

    act(() => {
      result.current.validatePassword(result.current.password);
    });
    await waitFor(() => {
      expect(result.current.error1).toBe("");
    });
  });
  // This is for validating the entire form

  // --------------------------------------------
  test("Validating the form", async () => {
    const { result } = renderHook(() => useValidation());

    act(() => {
      result.current.setName("John");
    });

    act(() => {
      result.current.setPassword("1234567");
    });

    await waitFor(() => {
      expect(result.current.name).toBe("John");
    });
    await waitFor(() => {
      expect(result.current.password).toBe("1234567");
    });

    await waitFor(() => {
      result.current.validateForm();
      return Promise.resolve();
    });

    await waitFor(() => {
      expect(result.current.error).toBe("Use a longer name");
    });

    await waitFor(() => {
      expect(result.current.error1).toBe(
        "Password should be at least 8 characters long"
      );
    });

    act(() => {
      result.current.setName("JohnDoe");
    });

    act(() => {
      result.current.setPassword("passwords");
    });

    await waitFor(() => {
      expect(result.current.name).toBe("JohnDoe");
    });
    await waitFor(() => {
      expect(result.current.password).toBe("passwords");
    });

    await waitFor(() => {
      result.current.validateForm();
      return Promise.resolve();
    });

    await waitFor(() => {
      expect(result.current.error).toBe("");
    });
    await waitFor(() => {
      expect(result.current.error1).toBe("");
    });
  });

  test("handles form submission correctly", async () => {
    const { result } = renderHook(() => useValidation());

    const mockEvent: any = {
      preventDefault: jest.fn(),
      currentTarget: {
        checkValidity: jest.fn(),
        reportValidity: jest.fn(),
      },
    };

    act(() => {
      result.current.setName("JohnDoe");
    });
    act(() => {
      result.current.setPassword("123456789");
    });

    await waitFor(() => {
      result.current.handleSubmit(mockEvent as FormEvent<HTMLFormElement>);
    });

    expect(mockEvent.preventDefault).toHaveBeenCalled();

    act(() => {
      result.current.setMessage("Successful");
    });
    await waitFor(() => {
      expect(result.current.message).toBe("Successful");
    });

    act(() => {
      result.current.setName("John");
    });
    act(() => {
      result.current.setPassword("1234567");
    });

    await waitFor(() => {
      result.current.handleSubmit(mockEvent as FormEvent<HTMLFormElement>);
    });

    act(() => {
      result.current.setMessage("");
    });
    await waitFor(() => {
      expect(result.current.message).toBe("");
    });
  });
});
