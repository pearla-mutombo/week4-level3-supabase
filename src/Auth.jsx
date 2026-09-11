import { useState } from "react";
import { supabase } from "./supabaseClient";

export default function Auth() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true);

    if (isRegistering) {
      const { error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) {
        setErrorMessage(error.message);
      } else {
        setSuccessMessage(
          "Registration successful! Please check your email if confirmation is required.",
        );
        setEmail("");
        setPassword("");
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        setErrorMessage(error.message);
      }
    }

    setLoading(false);
  }

  function handleModeChange() {
    setIsRegistering(!isRegistering);
    setErrorMessage("");
    setSuccessMessage("");
  }

  return (
    <section className="auth-container">
      <div className="auth-card">
        <h2>{isRegistering ? "Create an Account" : "Welcome Back"}</h2>

        <p>
          {isRegistering
            ? "Register with your email and password."
            : "Log in to manage your tasks."}
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>

          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email"
            required
          />

          <label htmlFor="password">Password</label>

          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
            minLength="6"
            required
          />

          <button type="submit" disabled={loading}>
            {loading
              ? "Please wait..."
              : isRegistering
                ? "Create Account"
                : "Log In"}
          </button>
        </form>

        {errorMessage && <p className="auth-error">{errorMessage}</p>}

        {successMessage && <p className="auth-success">{successMessage}</p>}

        <button
          type="button"
          className="auth-toggle"
          onClick={handleModeChange}>
          {isRegistering
            ? "Already have an account? Log in"
            : "Need an account? Register"}
        </button>
      </div>
    </section>
  );
}
