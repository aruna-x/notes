import { useState, useEffect } from 'react';
import { Card, Popup, Grid, Button, List } from "semantic-ui-react";
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import CollectionList from './CollectionList';

function Notes(){
    const [notes, setNotes] = useState([]);
    const history = useHistory();

    useEffect(()=>{
        fetch(`http://localhost:3000/notes/`) // todo: on server side REPLACE "1" with user id !!!
        .then(r => r.json())
        .then(data => {
            setNotes(data)
        })
    },[])
    
    const popupStyle = {
        background: '#000000'
    }

    let noteCards = <></>
    if (notes != []) {
        console.log(notes)
        noteCards = notes.map(n => {
            const description = n.thoughts.length > 200 ? n.thoughts.slice(0,197)+"..." : n.thoughts;
            const source = n.source.length > 40 ? n.source.slice(0,37)+"..." : n.source;
            const link = `http://localhost:4000/notes/${n.id}`
            if (n.note_type === "text") {
                const card = <Card key={n.id} href={link} header={n.note.length > 75 ? n.note.slice(0,72)+"..." : n.note} meta={source} description={description}/>
                return makePopup(card, n.id);
            }
            else if (n.note_type === "image")  {
                const card = <Card key={n.id} href={link} image={n.note} meta={source} description={description}/>
                return makePopup(card, n.id);
            }
            else {
                console.error("Unrecognized 'note_type'")
            }
        })
    }

    function handleDelete(id){
        fetch(`http://localhost:4000/notes/${id}`, {
            method: "DELETE"
        })
        .then(() => setNotes(notes.filter((n)=>n.id!==id)))
    }

    function handleEdit(id){
        history.push(`/notes/${id}/edit`);
    }

    function makePopup(card, id) {
        return(<Popup key={id} trigger={card} style={popupStyle} position='bottom center' flowing hoverable>
            <Grid centered divided columns={2}>
                <Grid.Column textAlign='center'>
                    <Button onClick={()=>handleEdit(id)}>Edit</Button>
                </Grid.Column>
                <Grid.Column textAlign='center'>
                    <Button onClick={()=>handleDelete(id)}>Delete</Button>
                </Grid.Column>
            </Grid>
        </Popup>)
    }
    
    return (
        <>
            <Style>
                <CollectionList/>
            </Style>
            <Card.Group centered>
                {notes ? noteCards : null}
            </Card.Group>
        </>
    )
}

export default Notes;

const Style = styled.div`
    max-width: 900px;
    margin: auto;
    display: flex;
    justify-content: center;
`
