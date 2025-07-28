import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  validateEmail,
  validatePassword,
  validateName,
} from "../utils/validation";
import { useAuth } from "../contexts/AuthContext";
import { api } from "../utils/api";
import "../components/AuthForm.css";

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleEmailBlur = () => setEmailError(validateEmail(email));
  const handlePasswordBlur = () => setPasswordError(validatePassword(password));
  const handleUsernameBlur = () => setUsernameError(validateName(username));
  const handleFullNameBlur = () => setFullNameError(validateName(fullName));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);
    const usernameErr = validateName(username);
    const fullNameErr = validateName(fullName);

    setEmailError(emailErr);
    setPasswordError(passwordErr);
    setUsernameError(usernameErr);
    setFullNameError(fullNameErr);

    if (emailErr || passwordErr || usernameErr || fullNameErr) return;

    setIsLoading(true);
    setErrorMessage("");

    try {
      const user = await api.signup(email, username, fullName);
      setUser(user);
      navigate("/tweets");
    } catch (error: any) {
      setErrorMessage("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>Sign up</h1>
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

          <div className="form-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={handleUsernameBlur}
              className={usernameError ? "error" : ""}
            />
            {usernameError && (
              <div className="error-message">{usernameError}</div>
            )}
          </div>

          <div className="form-group">
            <input
              type="text"
              placeholder="Full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              onBlur={handleFullNameBlur}
              className={fullNameError ? "error" : ""}
            />
            {fullNameError && (
              <div className="error-message">{fullNameError}</div>
            )}
          </div>

          <button type="submit" disabled={isLoading} className="submit-button">
            {isLoading ? "Signing up..." : "Sign up"}
          </button>
        </form>

        {errorMessage && (
          <div className="error-message general-error">{errorMessage}</div>
        )}

        <div className="auth-link">
          Already have an account? <Link to="/login">Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
