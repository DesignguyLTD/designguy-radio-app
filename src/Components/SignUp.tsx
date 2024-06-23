import React, { useState } from "react";

import { Link } from "react-router-dom";
import line from "../Images/line.svg";
import style from "../CSSModules/Login.module.css";

const useValidation = () => {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [error1, setError1] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const validateName = (value: string) => {
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
    let isValid = true;

    if (!validateName(name)) {
      isValid = false;
    }
    if (!validatePassword(password)) {
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      setMessage("Successful");
    } else {
      setMessage("");
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

const SignUp: React.FC = () => {
  const {
    name,
    password,
    setName,
    setPassword,
    error,
    error1,
    message,
    handleSubmit,
  } = useValidation();

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

        {/* This is the right side of the code */}

        {/* ---------------------------------------------------- */}

        <div className={style.right}>
          <div className={style["form-container"]}>
            <p className={style.login}>Create a personal account</p>

            {/* This is the form  */}
            {/* --------------------------------------------------- */}

            <form onSubmit={handleSubmit}>
              <div className={style["form-content"]}>
                <label htmlFor="Username">User name</label>
                <input
                  className={style.input}
                  type="text"
                  value={name}
                  id="Username"
                  name="Username"
                  placeholder="Enter username"
                  required
                  onChange={(e) => setName(e.target.value)}
                />
                {error && <p className={style["error-message"]}> {error}</p>}

                <label htmlFor="Password">Password</label>
                <input
                  className={style.input}
                  type="password"
                  value={password}
                  placeholder="Enter password"
                  id="Password"
                  name="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {error1 && <p className={style["error-message"]}> {error1}</p>}
              </div>
              <button className={style.submit} type="submit">
                Sign up
              </button>
              {message && <p className={style.message}>{message}</p>}
              <div>
                <p className={style.create}>
                  Already have an account? &nbsp;
                  <span className={style["span-create"]}>
                    <Link style={{ textDecoration: "none" }} to="/">
                      Log in
                    </Link>
                  </span>
                </p>
              </div>
              <div>
                <p className={style["extra-text"]}>
                  By signing in, you agree to OPMENTEK's
                </p>
                <p className={style["extra-text2"]}>Terms and Conditions</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export { useValidation };

export default SignUp;
