import { Link } from "react-router-dom";
import React from "react";
import line from "../Images/line.svg";
import style from "../CSSModules/Login.module.css";

export default function Login() {
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
        <div className={style.right}>
          <div className={style["form-container"]}>
            <p className={style.login}>Login</p>
            <form action="">
              <div className={style["form-content"]}>
                <label htmlFor="Username">User name</label>
                <input
                  className={style.input}
                  type="text"
                  id="Username"
                  name="Username"
                  placeholder="Enter username"
                  required
                />

                <label htmlFor="Password">Password</label>
                <input
                  className={style.input}
                  type="password"
                  placeholder="Enter password"
                  id="Password"
                  name="Password"
                  required
                />
              </div>
              <p className={style.forgot}>Forgot password?</p>
              <button className={style.submit} type="submit">
                Login
              </button>

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
