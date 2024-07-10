import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "../../CSSModules/navbar.module.css";
import { AuthContext } from "../../Contexts/authContext";

const Navbar = () => {
  const authContext = useContext(AuthContext);

  const handleLogout = () => {
    authContext?.logout();
  };

  // const navigationLinks = [
  //   { name: "About", href: "/about" },
  //   { name: "Projects", href: "/projects" },
  //   { name: "Insights", href: "/insights" },
  //   { name: "Locations", href: "/locations" },
  // ];

  return (
    <nav className={styles.navbar}>
      <div>
        <p className={styles.p}>DesignGuy Radio</p>
      </div>

      {/* <ul className={styles.ul}>
        {navigationLinks.map((navigations) => (
          <li className={styles.li} key={navigations.name}>
            <NavLink
              to={navigations.href}
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.activeLink}` : styles.link
              }
            >
              {navigations.name}
            </NavLink>
          </li>
        ))}
      </ul> */}

      <ul className={styles.signCtn}>
        <li>
          {authContext?.isLoggedIn ? (
            <div onClick={handleLogout} className={styles.signIn}>
              Logout
            </div>
          ) : (
            <Link className={styles.signIn} to="login">
              Login
            </Link>
          )}
        </li>
        <li>
          <Link to="/signUp" className={styles.signUp}>
            Sign Up
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
