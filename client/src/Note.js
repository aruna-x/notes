import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Card, Button, List, Popup, Grid, Header } from 'semantic-ui-react';
import styled from 'styled-components';

import CollectionList from './CollectionList';

function Note(){
    const [noteData, setNoteData] = useState();
    const { id } = useParams();
    const history = useHistory();

    useEffect(()=>{
        fetch(`http://localhost:3000/notes/${id}`)
        .then(r => r.json())
        .then(setNoteData)
    },[])

    let noteCard = <Card></Card>
    let collectionList = <></>
    if (noteData) {

        if (noteData.note_type === "text") {
            noteCard = <Card fluid centered header={noteData.note} meta={noteData.source} description={noteData.thoughts}/>
        }
        else if (noteData.note_type === "image")  {
            noteCard = <Card fluid centered image={noteData.note} meta={noteData.source} description={noteData.thoughts}/>
        }
        else {
            console.error("Unrecognized 'note_type'")
        }

        if (noteData.collections) {
            collectionList = <CollectionList noteCollections={noteData.collections}/>        
        }
    }

    const popupStyle = {
        background: '#000000'
    }

    function handleDelete(){
        fetch(`http://localhost:4000/notes/${id}`, {
            method: "DELETE"
        })
        .then(() => history.push("/notes"))
    }

    function handleEdit(){
        history.push(`/notes/${id}/edit`)
    }

    return(
        <Style>
            <Row>
                {collectionList}
            </Row>
            <Row>
                <Popup trigger={noteCard} style={popupStyle} position='right center' flowing hoverable>
                    <Grid centered divided columns={2}>
                        <Grid.Column textAlign='center'>
                            <Button onClick={handleEdit}>Edit</Button>
                        </Grid.Column>
                        <Grid.Column textAlign='center'>
                            <Button onClick={handleDelete}>Delete</Button>
                        </Grid.Column>
                    </Grid>
                </Popup>
            </Row>
        </Style>
    )
}

export default Note;

const Style = styled.div`
    max-width: 600px;
    margin: auto;
    display: flex;
    flex-direction: column;
`

const Row = styled.div`
    padding: 0px 0px;
    display: flex;
    flex-direction: row;
    justify-content: center;
`