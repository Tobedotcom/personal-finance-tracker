import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../ui/Card";
import Input from "../ui/Input";
import Button from "../ui/Button";

import signupIcon from "../../assets/images/signupIcon.svg";

function getPasswordStrength(password) {
  if (!password) return { label: "", className: "" };

  const hasNumber = /\d/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);
  const isLongEnough = password.length >= 8;

  const score = [hasNumber, hasSymbol, isLongEnough].filter(Boolean).length;

  if (score <= 1) {
    return {
      label: "Password strength: Weak. Try adding numbers or symbols.",
      className: "strength-weak",
    };
  }

  if (score === 2) {
    return {
      label: "Password strength: Fair. Try adding numbers or symbols.",
      className: "strength-fair",
    };
  }

  return {
    label: "Password strength: Strong.",
    className: "strength-strong",
  };
}

function SignupForm() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const strength = getPasswordStrength(password);

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");

    // Basic validation
    if (!fullName.trim() || !email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    if (!agreedToTerms) {
      setError(
        "You must agree to the Terms of Service and Privacy Policy."
      );
      return;
    }

    // Password validation
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    try {
      setIsLoading(true);

      // Check whether the email already exists
      const existingUserResponse = await fetch(
        `http://localhost:3000/users?email=${encodeURIComponent(
          email.trim()
        )}`
      );

      if (!existingUserResponse.ok) {
        throw new Error("Unable to check your email.");
      }

      const existingUsers = await existingUserResponse.json();

      if (existingUsers.length > 0) {
        setError("Yami this AZA dey already na. Try logging in instead.");
        return;
      }

      // Create the new user
      const createUserResponse = await fetch(
        "http://localhost:3000/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: fullName.trim(),
            email: email.trim(),
            password,
          }),
        }
      );

      if (!createUserResponse.ok) {
        throw new Error("Unable to create your account.");
      }

      const newUser = await createUserResponse.json();

      // Save only safe user information to the session.
      // Never store the password in localStorage/sessionStorage.
      const loggedInUser = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      };

      sessionStorage.setItem(
        "loggedInUser",
        JSON.stringify(loggedInUser)
      );

      // Send the new user to the dashboard
      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error("Signup error:", error);

      setError(
        error.message ||
          "Something went wrong. Make sure JSON Server is running."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="card-auth">
      <header className="auth-header">
        <img src={signupIcon} alt="" className="auth-logo" />

        <h1>Join us, Yami</h1>

        <p>Create your account to start managing your paper.</p>
      </header>

      <form onSubmit={handleSubmit} noValidate>
        <Input
          id="fullName"
          label="Full Name"
          type="text"
          placeholder="Amos Edos"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <Input
          id="email"
          label="Email Address"
          type="email"
          placeholder="yami@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="input-group">
          <label htmlFor="password">Password</label>

          <input
            id="password"
            className="input"
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {strength.label && (
            <p className={`password-strength ${strength.className}`}>
              {strength.label}
            </p>
          )}
        </div>

        {error && <p className="form-error">{error}</p>}

        <label className="checkbox-row">
          <input
            type="checkbox"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
          />

          <span>
            I agree to the{" "}
            <a href="#" className="inline-link">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="inline-link">
              Privacy Policy
            </a>
          </span>
        </label>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Creating Account..." : "Create Account →"}
        </Button>
      </form>
    </Card>
  );
}

export default SignupForm;