import { useState } from 'react';
import { useHistory } from "react-router-dom";
import styled from 'styled-components';

import NoteForm from './NoteForm';

function NewNote() {

    let history = useHistory();

    const [formData, setFormData] = useState({
        note: "",
        note_type: "text",
        source: "",
        thoughts: "",
        collections: [],
        new_collections: []
    });

    function handleSubmit(inputData){
        const newNoteData = {...inputData, collections: inputData.collections.map(c => c.id)}

        fetch("http://localhost:3000/notes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newNoteData)
        })
        .then(r => r.json())
        .then(() => history.push("/notes"));
    }

    return <NoteForm handleSubmit={handleSubmit} formData={formData} setFormData={setFormData}/>
}

export default NewNote;

const Style = styled.div`
    margin: auto;
    width: 500px;
`
const NewCollection = styled.div`
    text-align: right;
`

