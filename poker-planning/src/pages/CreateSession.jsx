import React, { useState } from "react";
import shortid from "shortid";

import Button from "../components/Button";
import ButtonAction from "../components/ButtonAction";
import InputFieldWithBorder from "../components/InputFieldWithBorder";
import InputField from '../components/InputField';

const CreateSession = () => {
    const [sessionName, setSessionName] = useState('')
    const [inputFields, setInputFields] = useState([
        {
            storyPoint: "",
            storyDescription: "",
        },
    ]);

    const handleAddFieldButton = (event) => {
        event.preventDefault();

        let newField = {
            storyPoint: "",
            storyDescription: "",
        };

        setInputFields([...inputFields, newField]);
    };

    const handleCreateSession = (event) => {
        event.preventDefault();
        console.log(inputFields, sessionName);
    };

    const onChangeInput = (index, event) => {
        let data = [...inputFields];
        data[index][event.target.name] = event.target.value;
        setInputFields(data);
    };

    const onChangeSessionName = (e) => {
        setSessionName(e.target.value);
    }

    const handleRemoveButton = (index, event) => {
        event.preventDefault();
        let data = [...inputFields];
        data.splice(index, 1)
        setInputFields(data)
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

                    <div className="session__form__storypoint">
                        <div className="session__form__storypoint__heading">Stories</div>
                        {inputFields.map((input, index) => (
                            <div
                                key={`${index}${input}`}
                                className="session__form__storypoint__inputfields"
                            >
                                <InputFieldWithBorder
                                    type="text"
                                    placeholder="Story Point"
                                    name="storyPoint"
                                    value={input.storyPoint}
                                    onChange={(event) => onChangeInput(index, event)}
                                />

                                <InputFieldWithBorder
                                    type="text"
                                    placeholder="Story Description"
                                    name="storyDescription"
                                    value={input.storyDescription}
                                    onChange={(event) => onChangeInput(index, event)}
                                />

                                <button onClick={() => handleRemoveButton(index, event)}>-</button>
                            </div>
                        ))}
                        <div className="session-form__storypoint__add">
                            <ButtonAction text="+" onClick={handleAddFieldButton} />
                        </div>
                        <div className="session__form__submit">
                            <Button text="Create Session" onClick={handleCreateSession} />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateSession;
