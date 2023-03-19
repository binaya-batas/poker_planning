import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import InputField from "../components/InputField";
import Button from "../components/Button";

import useUsers from "../hooks/useUsers";

import loginImage from "../assets/images/login-image.png";

const Signup = () => {
  const { registerUser } = useUsers();

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    submit_register: "submit_register",
  });

  const onChangeInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitForm = async (e) => {
    console.log("dddd");
    e.preventDefault();

    //checks if any value of form is empty by removing whitespaces.
    if (!Object.values(formData).every((val) => val.trim() !== "")) {
      toast.warning("Please fill all the required fields.", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    //password
    if (formData.password.length < 8) {
      toast.warning("Your password must be at least 8 characters.", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    if (formData.password.search(/[a-z]/i) < 0) {
      toast.warning("Your password must contain at least one letter.", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    if (formData.password.search(/[0-9]/) < 0) {
      toast.warning("Your password must contain at least one digit.", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    if (formData.password === formData.confirmPassword) {
      let data = await registerUser(formData);

      if (data.success) {
        toast.success("User was registered succesfully!!!.", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        navigate('/login')
      } else if (!data.success) {
        toast.error("User cannot be registered.", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } else {
      toast.warning("Password does not match.", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <div className="login">
      <div className="login__image">
        <figure>
          <img src={loginImage} alt="image with small pieces of paper" />
          <figcaption>
            Join the Fun and Estimation Frenzy with Planning Poker Game!
          </figcaption>
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
          <InputField
            type="text"
            placeholder="Fullname"
            name="name"
            onChange={onChangeInput}
          />

          <InputField
            type="email"
            placeholder="Email"
            name="email"
            onChange={onChangeInput}
          />

          <InputField
            type={`${showPassword ? "password" : "text"}`}
            placeholder="Password"
            name="password"
            onChange={onChangeInput}
          />

          <InputField
            type={`${showPassword ? "password" : "text"}`}
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={onChangeInput}
          />

          <div className="login__forgotPassword"></div>

          <Button
            text="Sign Up"
            type="submit"
            name="submit_register"
            value="submit_register"
            onClick={handleSubmitForm}
          />

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
