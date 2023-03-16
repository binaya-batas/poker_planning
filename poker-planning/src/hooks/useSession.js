import React from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useSession = () => {

  const navigate = useNavigate();

  const getSession = async ({ id }) => {
    try {
      axios.get(`http://localhost:8888/api/session/${id}`)
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
    } catch (error) {

    }
  }

  const createSession = async (sessionName) => {
    let action = 'createSession';
    let moderator = JSON.parse(sessionStorage.getItem("user"));

    try {
      await axios
        .post("http://localhost:8888/api/session", {
          sessionName: sessionName,
          moderator: moderator.id,
          action: action
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

  const joinSession = async (sessionId) => {
    let action = 'joinSession';
    let member = JSON.parse(sessionStorage.getItem("user"));

    try {
      await axios
        .post("http://localhost:8888/api/session", {
          sessionId: sessionId,
          member: member.id,
          action: action
        })
        .then((response) => {
          navigate(`/session/${sessionId}`)
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  return { createSession, joinSession };
}

export default useSession