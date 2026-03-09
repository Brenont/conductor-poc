import { render, screen } from "@testing-library/react";
import Login from "../page";

describe("Login page", () => {
  it("renders the Sign In heading", () => {
    render(<Login />);
    const heading = screen.getAllByText("Sign In")[0];
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveAttribute("data-slot", "card-title");
  });

  it("renders email input", () => {
    render(<Login />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toHaveAttribute("type", "email");
  });

  it("renders password input", () => {
    render(<Login />);
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toHaveAttribute(
      "type",
      "password"
    );
  });

  it("renders the Sign In button", () => {
    render(<Login />);
    expect(
      screen.getByRole("button", { name: /sign in/i })
    ).toBeInTheDocument();
  });

  it("renders the sign up link", () => {
    render(<Login />);
    expect(screen.getByText("Sign up")).toBeInTheDocument();
  });

  it("renders a card description", () => {
    render(<Login />);
    expect(
      screen.getByText("Enter your credentials to access your account")
    ).toBeInTheDocument();
  });
});
