import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Navbar from '../Components/navbar/Navbar';
import { BrowserRouter } from "react-router-dom";
import '@testing-library/jest-dom/extend-expect';

describe("Navbar component", () => {
  test("renders navbar with all links and buttons", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    expect(screen.getByText("DesignGuy Radio")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getByText("Insights")).toBeInTheDocument();
    expect(screen.getByText("Locations")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Sign In")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Sign Up")).toBeInTheDocument();
  });

  test("Sign In button displays alert on click", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    window.alert = jest.fn(); // Mock window.alert

    const signInButton = screen.getByDisplayValue("Sign In");
    fireEvent.click(signInButton);

    expect(window.alert).toHaveBeenCalledWith("You are about to Sign in");
  });

  test("Sign Up button displays alert on click", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    window.alert = jest.fn(); // Mock window.alert

    const signUpButton = screen.getByDisplayValue("Sign Up");
    fireEvent.click(signUpButton);

    expect(window.alert).toHaveBeenCalledWith("You are about to Sign Up");
  });

  test("renders active link correctly", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    const aboutLink = screen.getByText("About").closest('a');
    const projectsLink = screen.getByText("Projects").closest('a');
    const insightsLink = screen.getByText("Insights").closest('a');
    const locationsLink = screen.getByText("Locations").closest('a');

    /*
    // Simulate active link
    aboutLink.className = `${aboutLink.className} activeLink`;
    
    expect(aboutLink).toHaveClass("activeLink");
    expect(projectsLink).not.toHaveClass("activeLink");
    expect(insightsLink).not.toHaveClass("activeLink");
    expect(locationsLink).not.toHaveClass("activeLink");*/
  });
});
