import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext/AuthContext";
import styles from "./Login.module.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { isLoggedIn, dispatch } = useAuthContext();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    // Simulate a login request (replace with actual API call)
    try {
      const response = await fetch("http://localhost:5000/account/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, username }),
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error(data.message || "Login failed.");
      }

      dispatch({
        type: "LOGIN",
        payload: {
          username: data.user.username,
          email: data.user.email,
        },
      });

      // Redirect to home page
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  if (isLoggedIn) {
    navigate("/");
  }

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h1 className={styles.heading}>Login</h1>
        <p className={styles.subHeading}>
          Get access to your Orders, Wishlist, and Recommendations
        </p>

        <form onSubmit={handleLogin} className={styles.form}>
          <input
            type="text"
            placeholder="Username"
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
          <button type="submit" className={styles.button}>
            Login
          </button>
        </form>

        {error && <p className={styles.error}>{error}</p>}

        <p className={styles.terms}>
          By continuing, you agree to Flightart’s{" "}
          <Link to="/terms" className={styles.link}>
            Terms of Use
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className={styles.link}>
            Privacy Policy
          </Link>
        </p>

        <p className={styles.signupText}>
          New to Flightart?{" "}
          <Link to="/account/signup" className={styles.link}>
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
