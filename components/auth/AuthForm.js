import { useState, useRef } from "react";
import { signIn } from "next-auth/client";
import { useRouter } from "next/router";

let M;
if (typeof window !== "undefined") {
  M = require("materialize-css");
}

import style from "./AuthForm.module.css"

const createUser = async (email, password) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  return data;
};

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    // optional: Add validation

    if (isLogin) {
      const result = await signIn("credentials", {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      });
      
      if (!result.error) {
        // set some auth state
        router.replace("/new-meetup");
      } else {
        M.toast({html: JSON.stringify(result.error)})
      }
    } else {
      try {
        const result = await createUser(enteredEmail, enteredPassword);
        M.toast({html: 'User created'})
      } catch (error) {
        M.toast({html: JSON.stringify(error)})
      }
    }
  };

  return (
    <section className="container">
      <div className="row">
        <div className="col s12">
          <div className="card-panel">
            <div className="row">
              <h1>{isLogin ? "Login" : "Sign Up"}</h1>
              <form className="col s12" onSubmit={submitHandler}>
                <div className="input-field">
                  <input
                    className="validate"
                    type="email"
                    id="email"
                    required
                    ref={emailInputRef}
                  />
                  <label htmlFor="email">Your Email</label>
                </div>
                <div className="input-field">
                  <input
                    className="validate"
                    type="password"
                    id="password"
                    required
                    ref={passwordInputRef}
                  />
                  <label htmlFor="password">Your Password</label>
                </div>

                <div>
                  <button
                    className="btn waves-effect waves-light"
                    type="submit"
                  >
                    {isLogin ? "Login" : "Create Account"}
                  </button>
                  <br /><br />
                  <a
                    className={style.style_switchAuthModeHandler}
                    onClick={switchAuthModeHandler}
                  >
                    {isLogin
                      ? "Create new account"
                      : "Login with existing account"}
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthForm;
