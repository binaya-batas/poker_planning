import React, { useState } from "react";

import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Button from "../components/Button";
import ButtonAction from "../components/ButtonAction";
import InputFieldWithBorder from "../components/InputFieldWithBorder";
import InputField from '../components/InputField';

import useSession from "../hooks/useSession";
import { Navigate } from "react-router-dom";

const CreateSession = () => {
    const [sessionName, setSessionName] = useState('')
    const [sessionLink, setSessionLink] = useState('')
    const loggedIn = JSON.parse(sessionStorage.getItem("loggedIn"));

    const { createSession, joinSession } = useSession();
    
    const onChangeSessionName = (event) => {
        setSessionName(event.target.value);
    }

    const onChangeSessionLink = (event) => {
        setSessionLink(event.target.value);
    }

    const handleCreateSession = (event) => {
        event.preventDefault();

        if (!sessionName.trim().length) {
            toast.warning("You must provide a sessin name before creating a session.", {
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
        createSession(sessionName);
    }

    const handleCreateSessionLink = (event) => {
        event.preventDefault();

        if (!sessionLink.trim().length) {
            toast.warning("You must provide a link before joining a session.", {
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

        let link= sessionLink.split("/");
        joinSession(link[4]);
    }

    return (
        <>
        {
            loggedIn ?
            <div className="container">
                <div className="session">
                    <div className="session__heading">Create session</div>

                    <form action="" className="session__form">
                        <InputFieldWithBorder
                            type="text"
                            placeholder="Session Name"
                            name="sessionName"
                            value={sessionName}
                            onChange={onChangeSessionName}
                        />

                        <div className="session__form__submit">
                            <Button text="Create Session" onClick={handleCreateSession} />
                        </div>

                        <InputFieldWithBorder
                            type="text"
                            placeholder="Paste your invitation link here"
                            name="sessionLink"
                            value={sessionLink}
                            onChange={onChangeSessionLink}
                        />

                        <div className="session__form__submit">
                            <Button text="Join Session" onClick={handleCreateSessionLink} />
                        </div>
                    </form>
                </div>
            </div>
            :
            <Navigate to='/login' />
        }
        </>
    );
};

export default CreateSession;
