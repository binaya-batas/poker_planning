import React, { useState } from "react";
import { Link } from "react-router-dom";

import InputField from "../components/InputField";
import Button from "../components/Button";

import useUsers from "../hooks/useUsers";

import loginImage from "../assets/images/login-image.png";

const Signup = () => {
  const { registerUser } = useUsers(); 

  const [showPassword, setShowPassword] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    submit_register: "submit_register"
  });

  const onChangeInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitForm = (e) => {
    console.log("dddd");
    e.preventDefault();

    //checks if any value of form is empty by removing whitespaces.
    if(!Object.values(formData).every(val => val.trim() !== '')){
      console.log('Please Fill in all Required Fields!');
      return;
    }

    if (formData.password === formData.confirmPassword) {
      registerUser(formData);
    }
  }

  return (
    <div className="login">
      <div className="login__image">
        <figure>
          <img src={loginImage} alt="image with small pieces of paper" />
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
          <InputField type="text" placeholder="Fullname" name="name" onChange={onChangeInput} />
          
          <InputField type="email" placeholder="Email" name="email" onChange={onChangeInput} />

          <InputField type={`${showPassword ? 'password' : 'text'}`} placeholder="Password" name="password" onChange={onChangeInput} />

          <InputField type={`${showPassword ? 'password' : 'text'}`} placeholder="Confirm Password" name="confirmPassword" onChange={onChangeInput} />


          <div className="login__forgotPassword">
          </div>

          <Button text="Sign Up" type="submit" name="submit_register" value="submit_register" onClick={handleSubmitForm} />

          <div className="login__dha">
            <span style={{ marginRight: "8px" }}>Already have an account?</span>
            <span>
              <Link to="/login">Login</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
