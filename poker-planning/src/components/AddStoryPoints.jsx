import React, {useState} from 'react'

import InputFieldWithBorder from './InputFieldWithBorder';
import ButtonAction from './ButtonAction';
import Button from './Button';

const AddStoryPoints = () => {
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

    const onChangeInput = (index, event) => {
        let data = [...inputFields];
        data[index][event.target.name] = event.target.value;
        setInputFields(data);
    };

    const handleRemoveButton = (index, event) => {
        event.preventDefault();
        let data = [...inputFields];
        data.splice(index, 1)
        setInputFields(data)
    }

    const handleAddStoryPoints = () => {
        console.log(inputFields);
    }

    return (
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
                <Button text="Add Story Points" onClick={handleAddStoryPoints} />
            </div>
        </div>
    )
}

export default AddStoryPoints