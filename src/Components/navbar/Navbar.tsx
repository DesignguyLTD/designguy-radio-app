import React from "react";
import styles from "../../CSSModules/navbar.module.css";
import { NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div>
        <p className={styles.p}>DesignGuy Radio</p>
      </div>
      <ul className={styles.ul}>
        <li className={styles.li}>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.activeLink}` : styles.link
            }
          >
            About
          </NavLink>
        </li>
        <li className={styles.li}>
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.activeLink}` : styles.link
            }
          >
            Projects
          </NavLink>
        </li>
        <li className={styles.li}>
          <NavLink
            to="/insights"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.activeLink}` : styles.link
            }
          >
            Insights
          </NavLink>
        </li>
        <li className={styles.li}>
          <NavLink
            to="/locations"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.activeLink}` : styles.link
            }
          >
            Locations
          </NavLink>
        </li>
      </ul>
      <ul className={styles.signCtn}>
        <li>
          <NavLink to="/login">
            <input
              type="button"
              value="Sign In"
            // onClick={() => alert("You are about to Sign in")}
              className={styles.signIn}
            />
          </NavLink>
        </li>
        <li>
          <NavLink to="/signUp">
            <input
              type="button"
              value="Sign Up"
             // onClick={() => alert("You are about to Sign Up")}
              className={styles.signUp}
            />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
