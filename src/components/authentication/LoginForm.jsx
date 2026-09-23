import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Card from "../ui/Card";
import Input from "../ui/Input";
import Button from "../ui/Button";

import loginIcon from "../../assets/images/loginIcon.svg";

function LoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please fill in both fields.");
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(
        `http://localhost:3000/users?email=${encodeURIComponent(
          email.trim()
        )}`
      );

      if (!response.ok) {
        throw new Error("Could not connect to the server.");
      }

      const users = await response.json();

      console.log("Users returned from API:", users);

      if (users.length === 0) {
        setError("Incorrect email or password.");
        return;
      }

      const user = users[0];

      if (user.password !== password) {
        setError("Incorrect email or password.");
        return;
      }

      const loggedInUser = {
        id: user.id,
        name: user.name,
        email: user.email,
      };

      if (rememberMe) {
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify(loggedInUser)
        );

        sessionStorage.removeItem("loggedInUser");
      } else {
        sessionStorage.setItem(
          "loggedInUser",
          JSON.stringify(loggedInUser)
        );

        localStorage.removeItem("loggedInUser");
      }

      console.log("Login successful:", loggedInUser);

      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setError("Something went wrong. Make sure JSON Server is running.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="card-auth">
      <header className="auth-header">
        <img src={loginIcon} alt="" className="auth-logo" />

        <h1>Welcome Back</h1>

        <p>Log in to manage your paper.</p>
      </header>

      <form onSubmit={handleSubmit} noValidate>
        <Input
          id="email"
          label="Email Address"
          type="email"
          placeholder="e.g. yami@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="input-group">
          <div className="label-row">
            <label htmlFor="password">Password</label>

            <a href="#" className="inline-link">
              Forgot password?
            </a>
          </div>

          <input
            id="password"
            className="input"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="form-error">{error}</p>}

        <label className="checkbox-row">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />

          <span>Remember me for 30 days</span>
        </label>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login →"}
        </Button>
      </form>

      <p className="auth-switch">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </Card>
  );
}

export default LoginForm;