import React, { useState } from "react";
import { Link } from "react-router-dom";

import InputField from "../components/InputField";
import Button from "../components/Button";
import loginImage from "../assets/images/login-image.png";

const Login = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = (e) => {
    e.preventDefault();

    if(formData.email == '' || formData.password == '') 
    {
      console.log("error");
      return;
    }

    console.log(formData);
  }

  return (
    <div className="login">
      <div className="login__image">
        <figure>
          <img src={loginImage} alt="image with small pieces of paper" srcset="" />
          <figcaption>Join the Fun and Estimation Frenzy with Planning Poker Game!</figcaption>
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

        <form action="" className="login__right__form">
          <InputField type="email" placeholder="Email" name="email" onChange={onChangeInput} />

          <InputField type={`${showPassword ? 'password': 'text'}`} placeholder="Password" name="password" onChange={onChangeInput} />

          <div className="login__forgotPassword">
            <a href="">Forgot Password</a>
          </div>

          <Button text="Log In" onClick={handleClick} />

          <div className="login__dha">
            <span style={{ marginRight: "8px" }}>Don't have an account?</span>
            <span>
              <Link to="/signup">Sign up for free</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;