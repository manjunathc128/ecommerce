import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./SignUp.module.css";
import { useAuthContext } from "../context/AuthContext/AuthContext";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { isLoggedIn, dispatch } = useAuthContext();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    // Validate fields
    if (!username || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Simulate a signup request (replace with actual API call)
    try {
      const response = await fetch(
        "https://ecommerce-s1b5.onrender.com/account/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        }
      );

      const data = await response.json();
      console.log(` signUp response ${data}`);
      if (!response.ok) {
        throw new Error(data.message || "Signup failed.");
      }
      dispatch({
        type: "SIGNUP",
        payload: {
          username: data.user.username,
          email: data.user.email,
        },
      });
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.signupBox}>
        <h1 className={styles.heading}>Sign Up</h1>
        <p className={styles.subHeading}>
          Looks like you're new here! Sign up with your email to get started.
        </p>

        <form onSubmit={handleSignUp} className={styles.form}>
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.input}
            required
          />
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={styles.input}
            required
          />
          <button type="submit" className={styles.button}>
            Continue
          </button>
        </form>

        {error && <p className={styles.error}>{error}</p>}

        <p className={styles.terms}>
          By continuing, you agree to Ekart’s
          <Link to="/terms" className={styles.link}>
            Terms of Use
          </Link>
          and
          <Link to="/privacy" className={styles.link}>
            Privacy Policy
          </Link>
          .
        </p>

        <p className={styles.loginText}>
          Existing User?
          <Link to="/account/login" className={styles.link}>
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
