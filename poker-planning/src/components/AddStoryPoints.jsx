import React, {useState} from 'react'

import InputFieldWithBorder from './InputFieldWithBorder';
import ButtonAction from './ButtonAction';
import Button from './Button';

import useSession from '../hooks/useSession';

const AddStoryPoints = ({ id }) => {
    const { createSessionStoryPoints } = useSession();
    const [inputFields, setInputFields] = useState(
        {
            storyTitle: "",
            storyDescription: "",
        },
    );
    
    const onChangeInput = (event) => {
        setInputFields({
            ...inputFields,
            [event.target.name]: event.target.value
        })
    };
    

    const handleAddStoryPoints = () => {
        createSessionStoryPoints(inputFields, id);

        setInputFields({
            storyTitle: '',
            storyDescription: ''
        })
    }

    return (
        <div className="session__form__storypoint">
            <div className="session__form__storypoint__heading">Stories</div>
                <div
                    className="session__form__storypoint__inputfields"
                >
                    <InputFieldWithBorder
                        type="text"
                        placeholder="Story Title"
                        name="storyTitle"
                        value={inputFields.storyTitle}
                        onChange={onChangeInput}
                    />

                    <InputFieldWithBorder
                        type="text"
                        placeholder="Story Description"
                        name="storyDescription"
                        value={inputFields.storyDescription}
                        onChange={onChangeInput}
                    />
                </div>
            <div className="session__form__submit">
                <Button text="Add Story Points" onClick={handleAddStoryPoints} />
            </div>
        </div>
    )
}

export default AddStoryPoints