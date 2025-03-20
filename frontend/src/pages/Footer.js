import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h4>Home</h4>
          <ul>
            <li>Delivery Areas</li>
            <li>Careers</li>
            <li>Customer Support</li>
            <li>Press</li>
          </ul>
        </div>
        <div className={styles.footerSection}>
          <h4>Legal</h4>
          <ul>
            <li>Privacy Policy</li>
            <li>Terms of Use</li>
            <li>Responsible Disclosure Policy</li>
          </ul>
        </div>
        <div className={styles.footerSection}>
          <h4>Follow Us</h4>
          <div className={styles.socialIcons}>
            <a
              href="http://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/path/to/twitter-logo.png" alt="Twitter" />
            </a>
            <a
              href="http://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/path/to/linkedin-logo.png" alt="LinkedIn" />
            </a>
            <a
              href="http://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/path/to/instagram-logo.png" alt="Instagram" />
            </a>
            <a href="mailto:your-email@example.com">
              <img src="/path/to/email-logo.png" alt="Email" />
            </a>
          </div>
        </div>
        <div className={styles.footerSection}>
          <h4>Contact Us</h4>
          <p>Email: your-email@example.com</p>
          <p>Mobile: +123 456 7890</p>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>&copy; {new Date().getFullYear()} Zapto. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
