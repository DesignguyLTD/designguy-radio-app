import { Link } from "react-router-dom";
import line from "../Images/line.svg";
import style from "../CSSModules/Login.module.css";
import { useState } from "react";
const useValid = () => {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [error1, setError1] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const validateName = (value: string): boolean => {
    if (value === "") {
      setError("Username cannot be left blank");
      return false;
    } else if (value.length < 5) {
      setError("Use a longer name");
      return false;
    } else if (value.includes(" ")) {
      setError("No white spaces between characters");
      return false;
    } else {
      setError("");
      return true;
    }
  };

  const validatePassword = (value: string) => {
    if (value.length <= 8) {
      setError1("Password should be at least 8 characters long");
      return false;
    } else if (value === "") {
      setError1("Password cannot be left blank");
      return false;
    }
    setError1("");
    return true;
  };

  const validateForm = (): boolean => {
    const isNameValid = validateName(name);
    const isPasswordValid = validatePassword(password);
    return isNameValid && isPasswordValid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      setMessage("Successful");
    } else {
      setMessage("Please,fill in the required fields");
    }
  };

  return {
    name,
    password,
    setName,
    setPassword,
    error,
    error1,
    message,
    setMessage,
    handleSubmit,
    validateForm,
    validateName,
    validatePassword,
  };
};
export default function Login() {
  const {
    name,
    password,
    setName,
    setPassword,
    error,
    error1,
    message,
    handleSubmit,
  } = useValid();

  return (
    <>
      <div className={style.container}>
        <div className={style.left}>
          <div className={style.mainText}>
            Hey, <br /> Welcome back <br /> to
            <span className={style.mainSpanText}> DG Radio!</span>
          </div>
          <img className={style.image} src={line} alt="" />
        </div>

        {/* This is the form section */}
        {/* -------------------------------------------------------------- */}

        <div className={style.right}>
          <div className={style["form-container"]}>
            <p className={style.login}>Login</p>

            {/* The form */}

            <form onSubmit={handleSubmit} action="">
              <div className={style["form-content"]}>
                <label htmlFor="Username">User name</label>
                <input
                  className={style.input}
                  type="text"
                  id="Username"
                  name="Username"
                  placeholder="Enter username"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />

                {error && <p className={style["error-message"]}> {error}</p>}

                <label htmlFor="Password">Password</label>
                <input
                  className={style.input}
                  type="password"
                  placeholder="Enter password"
                  id="Password"
                  name="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {error1 && <p className={style["error-message"]}> {error1}</p>}

              <p className={style.forgot}>Forgot password?</p>
              <button className={style.submit} type="submit">
                Login
              </button>

              {message && <p className={style.message}>{message}</p>}

              <div>
                <p className={style.create}>
                  Already have an account? &nbsp;
                  <span className={style["span-create"]}>
                    <Link style={{ textDecoration: "none" }} to="/signup">
                      Create and account
                    </Link>
                  </span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export { useValid };
