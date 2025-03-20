import React from "react";
import { useAppContext } from "../context/AppContext/AppContext";
import { useAuthContext } from "../context/AuthContext/AuthContext";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import styles from "./Header.module.css";
import Logo from "../components/Logo";
import Search from "../components/Search";

const Header = () => {
  const { isLoggedIn, username } = useAuthContext();
  const { cart } = useAppContext();
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Logo />
      </div>
      <div className={styles.searchContainer}>
        <Search />
      </div>
      <div className={styles.cartContainer}>
        <Link to="/cart">
          <ShoppingCartIcon
            className={styles.cartIcon}
            fontSize="large"
            color="inherit"
          />
          <span className={styles.cartItemCount}>{cart.length}</span>
        </Link>
        <span className={styles.cartContainerName}> Cart</span>
      </div>

      <div className={styles.accountContainer}>
        {isLoggedIn ? (
          <div className={styles.profileContainer}>
            <div className={styles.accountName}>{username}</div>
            <div className={styles.accountDropdown}>
              <span>
                <Link to="/profile">My Profile</Link>
              </span>
              <span>orders</span>
              <span>cart</span>
            </div>
          </div>
        ) : (
          <button>
            <Link to={`/account/signin`} className={styles.signInButton}>
              Sign in
            </Link>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
