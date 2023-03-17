import React from "react";

import axios from "axios";

const useUsers = () => {

  const loginUser = async ({ email, password, submit_login }) => {
    console.log(email, password, submit_login);
    try {
      const { data } = await axios
        .post("http://localhost:8888/api/login", {
          email,
          password,
          submit_login,
        })
      return data;

    } catch (error) {
      console.log(error);
    }
  };

  const registerUser = async ({ name, email, password, submit_register }) => {
    console.log(name, email, password, submit_register);
    try {
      const { data } = await axios
        .post("http://localhost:8888/api/signup", {
          name,
          email,
          password,
          submit_register,
        })
        
        return data;
    } catch (error) {
      return error;
    }
  };

  return { registerUser, loginUser };
};

export default useUsers;
