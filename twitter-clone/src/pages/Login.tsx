import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "../utils/validation";
import { useAuth } from "../contexts/AuthContext";
import { api } from "../utils/api";
import "../components/AuthForm.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleEmailBlur = () => setEmailError(validateEmail(email));
  const handlePasswordBlur = () => setPasswordError(validatePassword(password));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);

    setEmailError(emailErr);
    setPasswordError(passwordErr);

    if (emailErr || passwordErr) return;

    setIsLoading(true);
    setErrorMessage("");

    try {
      const user = await api.login(email);
      setUser(user);
      navigate("/tweets");
    } catch (error: any) {
      setErrorMessage(
        error.status === 404
          ? "Invalid email or password"
          : "Something went wrong"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>Log in</h1>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={handleEmailBlur}
              className={emailError ? "error" : ""}
            />
            {emailError && <div className="error-message">{emailError}</div>}
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={handlePasswordBlur}
              className={passwordError ? "error" : ""}
            />
            {passwordError && (
              <div className="error-message">{passwordError}</div>
            )}
          </div>

          <button type="submit" disabled={isLoading} className="submit-button">
            {isLoading ? "Logging in..." : "Log in"}
          </button>
        </form>

        {errorMessage && (
          <div className="error-message general-error">{errorMessage}</div>
        )}

        <div className="auth-link">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
