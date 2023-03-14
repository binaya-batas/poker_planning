import React from "react";

import axios from "axios";

const useUsers = () => {
  const loginUser = async ({ email, password, submit_login }) => {
    console.log(email, password, submit_login);
    try {
      await axios
        .post("http://pokerplanning.local/", {
          email,
          password,
          submit_login,
        })
        .then((response) => {
          console.log(JSON.parse(response.config.data));
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const registerUser = async ({ name, email, password, submit_register }) => {
    console.log(name, email, password, submit_register);
    try {
      await axios
        .post("http://pokerplanning.local/signup", {
          name,
          email,
          password,
          submit_register,
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return { registerUser, loginUser };
};

export default useUsers;
