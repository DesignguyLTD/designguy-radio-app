import { useContext } from "react";
import styles from "../../CSSModules/navbar.module.css";
import { AuthContext } from "../../Contexts/authContext";
import {Link} from "react-router-dom";

const Navbar = () => {
  const authContext = useContext(AuthContext);

    const isLoggedIn = authContext?.isLoggedIn ?? false;


    const handleLogout = () => {
      authContext?.logout();
  };



  return (
    <nav className={styles.navbar}>
      <div>
        <p className={styles.p}>DesignGuy Radio</p>
      </div>


      <ul className={styles.signCtn}>
        <li>
          {isLoggedIn ? (
            <div onClick={handleLogout} className={styles.signIn}>
              Logout
            </div>
          ) : (
             <Link className={styles.signIn} to="/login">
               Login
             </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
