import React from "react";

import InputField from "../components/InputField";
import Button from "../components/Button";

const Login = () => {
  return (
    <div className="login">
      <div className="login__image">
        <figure>
          <img src="" alt="" srcset="" />
        </figure>
      </div>

      <div className="login__right">
        <div className="login__right__header">
          <div className="">
            <i>*</i>
          </div>
          <div className="">Planning Poker</div>
        </div>

        <div className="login__right__welcome">
          <div className="login__right__welcome__title">Welcome,</div>
          <div>Welcome back! Please enter your details</div>
        </div>

        <Button text="Log In" />

        <form action="" className="login__right__form">
          <InputField type="email" placeholder="Email" name="email" />

          <InputField type="password" placeholder="Password" name="password" />

          <div className="login__forgotPassword">
            <a href="">Forgot Password</a>
          </div>

          <Button text="Log In" />

          <div className="login__dha">
            <span style={{ marginRight: "8px" }}>Don't have an account?</span>
            <span>
              <a href="#">Sign up for free</a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
