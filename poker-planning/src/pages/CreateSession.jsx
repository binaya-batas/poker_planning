import React, { useState } from "react";
import shortid from "shortid";

import Button from "../components/Button";
import ButtonAction from "../components/ButtonAction";
import InputFieldWithBorder from "../components/InputFieldWithBorder";
import InputField from '../components/InputField';

import useSession from "../hooks/useSession";

const CreateSession = () => {
    const [sessionName, setSessionName] = useState('')
    const [sessionLink, setSessionLink] = useState('')

    const onChangeSessionName = (event) => {
        setSessionName(event.target.value);
    }

    const onChangeSessionLink = (event) => {
        setSessionLink(event.target.value);
    }

    const { createSession, joinSession } = useSession();

    const handleCreateSession = (event) => {
        event.preventDefault();
        console.log(sessionName);
        // createSession(sessionName);
    }

    const handleCreateSessionLink = (event) => {
        event.preventDefault();

        let link= sessionLink.split("/");
        joinSession(link[4]);
    }

    return (
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
                        placeholder="Join an existing session"
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
    );
};

export default CreateSession;
