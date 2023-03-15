import React, { useState } from "react";
import shortid from "shortid";

import Button from "../components/Button";
import ButtonAction from "../components/ButtonAction";
import InputFieldWithBorder from "../components/InputFieldWithBorder";
import InputField from '../components/InputField';

import useSession from "../hooks/useSession";

const CreateSession = () => {
    const [sessionName, setSessionName] = useState('')

    const onChangeSessionName = (event) => {
        setSessionName(event.target.value);
    }

    const { createSession } = useSession();

    const handleCreateSession = (event) => {
        event.preventDefault();

        createSession(sessionName);
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
                </form>
            </div>
        </div>
    );
};

export default CreateSession;
