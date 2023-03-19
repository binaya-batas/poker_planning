import React, { useState } from 'react'
import axios from 'axios';

const useStoryPoint = () => {
    const [points, setPoints] = useState([]);

    const addStoryPoint = async (storyPoint) => {
        try {
            await axios
              .post("http://localhost:8888/api/storypoint", {
                storyId: storyPoint.storyId,
                userId: storyPoint.userId,
                storyPoint: storyPoint.storyPoint,
                action: 'addStoryPoint'
              })
              .then((response) => {
                if (response.data.success) {
                  console.log(response.data);
                }
              })
              .catch((error) => {
                console.log(error);
              });
          } catch (error) {
            console.log(error);
          }
    }

    const getStoryPoints = async (sessionId) => {
      try {
        await axios.get(`http://localhost:8888/api/storypoint/${sessionId}`)
        .then((response) => {
          setPoints(response.data.storypoints);
        })
      } catch (error) {
        console.log(error);
      }
    }

    const revealStoryPoints = async (sessionId) => {
      try {
        await axios
          .patch(`http://localhost:8888/api/storypoint/${sessionId}`, {
            storyId: storyPoint.storyId,
            userId: storyPoint.userId,
            storyPoint: storyPoint.storyPoint,
            action: 'addStoryPoint'
          })
          .then((response) => {
            if (response.data.success) {
              console.log(response.data);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    }

    return { addStoryPoint, revealStoryPoints, getStoryPoints, points }
}

export default useStoryPoint