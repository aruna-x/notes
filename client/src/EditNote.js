import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NoteForm from './NoteForm';

function EditNote(){
    const { id } = useParams();
    const history = useHistory();

    const [formData, setFormData] = useState({
        note: "",
        note_type: "text",
        source: "",
        thoughts: "",
        collections: [],
        new_collections: []
    });

    useEffect(()=>{
        fetch(`http://localhost:3000/notes/${id}`)
        .then(r => r.json())
        .then(data => {
            const dbFormData = {...data, new_collections: []}
            setFormData(dbFormData)
        })
    },[])

    function handleSubmit(inputData){
        const newNoteData = {...inputData, collections: inputData.collections.map(c => c.id)}

        fetch(`http://localhost:3000/notes/${id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newNoteData)
        })
        .then(r => r.json())
        .then(() => history.push(`/notes/${id}`));
    }

    return <NoteForm handleSubmit={handleSubmit} formData={formData} setFormData={setFormData}/>
}

export default EditNote;