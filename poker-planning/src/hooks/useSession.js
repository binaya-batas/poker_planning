import React, {useState} from 'react';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useSession = () => {
  const [members, setMembers] = useState([]);
  const [stories, setStories] = useState([]);
  const [history, setHistory] = useState([]);
  const [currentStory, setCurrentStory] = useState();
  const navigate = useNavigate();

  const updateStoryStatus = async (id, status) => {
    try {
      axios.patch(`http://localhost:8888/api/stories/${id}`,
      {
        "status": status
      })
        .then((response) => {
          console.log(response.data)
        })
        .catch((error) => console.log(error));
    } catch (error) {
        console.log(error)
    }
  }

  const getStoryByActiveStatus = async (sessionId) => {
    try {
      axios.post(`http://localhost:8888/api/stories`,
      {
        status: "PENDING",
        sessionId: sessionId,
        action: 'getActiveUserStory'
      })
        .then((response) => {
          setCurrentStory(response.data.user)
        })
        .catch((error) => console.log(error));
    } catch (error) {
        console.log(error)
    }
  }

  const getSessionHistory = (moderator) => {
    try {
      axios.post(`http://localhost:8888/api/session`,
      {
        moderator: moderator,
        action: 'getSessionHistory'
      })
        .then((response) => {
          setHistory(response.data.history);
        })
        .catch((error) => console.log(error));
    } catch (error) {
        console.log(error)
    }
  }

  const deleteStory = async (id) => {
    try {
      await axios.delete(`http://localhost:8888/api/stories/${id}`)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => console.log(error));
    } catch (error) {
        console.log(error);
    }
  }
  
  //creates stories for a particular session
  const createSessionStoryPoints = async (inputFields, id) => {
    let action = 'createNewStoryPoint';
    console.log(inputFields);
    
    try {
      await axios.post(`http://localhost:8888/api/stories/${id}`, 
      {
        sessionId: id,
        storyTitle: inputFields.storyTitle,
        storyDescription: inputFields.storyDescription,
        status: 'ONQUEUE',
        action: action
      })
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => console.log(error));
    } catch (error) {
        console.log(error);
    }
  }

  const getSessionMembers = async(id) => {
    try {
      await axios.get(`http://localhost:8888/api/members/${id}`)
        .then((response) => {
          setMembers(response.data);
        })
        .catch((error) => console.log(error));
    } catch (error) {
        console.log(error);
    }
  }


  const getSessionUserStories = async(id) => {
    try {
      await axios.get(`http://localhost:8888/api/session/${id}`)
        .then((response) => {
          setStories(response.data);
        })
        .catch((error) => console.log(error));
    } catch (error) {
        console.log(error);
    }
  }

  const createSession = async (sessionName) => {
    let action = 'createSession';
    let moderator = JSON.parse(sessionStorage.getItem("user"));

    try {
      await axios
        .post("http://localhost:8888/api/session", {
          name: sessionName,
          moderator: moderator.id,
          action: action
        })
        .then((response) => {
          if (response.data.id) {
            navigate(`/session/${response.data.id}`)
            toast.success('Session created successfully.', {
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
          memberId: member.id,
          action: action
        })
        .then((response) => {
          if(response.data.success) {
            navigate(`/session/${sessionId}`)
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  const endSession = async (sessionId) => {
    try {
      await axios.patch(`http://localhost:8888/api/session/${sessionId}`)
    } catch(error) {
      console.log(error);
    }
  }


  return {
    endSession,
    getStoryByActiveStatus, 
    createSession,
    getSessionHistory, 
    joinSession, 
    getSessionMembers, 
    createSessionStoryPoints, 
    getSessionUserStories,
    deleteStory,
    updateStoryStatus, 
    members, 
    stories,
    currentStory,
    history 
  };
}

export default useSession