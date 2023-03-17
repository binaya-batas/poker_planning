import React, { useState } from "react";

import Button from "../components/Button";
import ButtonAction from "../components/ButtonAction";
import InputFieldWithBorder from "../components/InputFieldWithBorder";
import InputField from '../components/InputField';

import useSession from "../hooks/useSession";

const CreateSession = () => {
    const [sessionName, setSessionName] = useState('')
    const [sessionLink, setSessionLink] = useState('')

    const { createSession, joinSession } = useSession();
    
    const onChangeSessionName = (event) => {
        setSessionName(event.target.value);
    }

    const onChangeSessionLink = (event) => {
        setSessionLink(event.target.value);
    }

    const handleCreateSession = (event) => {
        event.preventDefault();
        createSession(sessionName);
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
    );
};

export default CreateSession;
