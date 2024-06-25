import { Link } from "react-router-dom";
import React from "react";
import line from "../Images/line.svg";
import style from "../CSSModules/Login.module.css";
export default function SignUp() {
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
            <p className={style.login}>Create a personal account</p>
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
              <button className={style.submit} type="submit">
                Sign up
              </button>

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
                  By signing in, you agree to DesignGuy Radio
                </p>
                <p className={style["extra-text2"]}>Terms and Conditions</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
