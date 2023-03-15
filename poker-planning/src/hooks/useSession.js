import React from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const useSession = () => {

    const navigate = useNavigate();

    const getSession = async() => {
        try {
            axios.get("http://localhost:8888/api/session/1")
            .then((response) => console.log(response))
            .catch((error) => console.log(error));
        } catch (error) {
            
        }
    }

    const createSession = async (sessionName) => {
        let moderator = JSON.parse(sessionStorage.getItem("moderator"));
        console.log(sessionName);
        try {
          await axios
            .post("http://localhost:8888/api/session", {
              sessionName: sessionName,
              moderator: moderator.id
            })
            .then((response) => {
                if (response.data.id) {
                    navigate(`/session/${response.data.id}`)
                }
            })
            .catch((error) => {
              console.log(error);
            });
        } catch (error) {
          console.log(error);
        } 
    }

    return { createSession };
}

export default useSession