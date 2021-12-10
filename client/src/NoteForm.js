import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import styled from 'styled-components';
import { Form, FormField, TextArea, Input, Dropdown, Button, Message, Radio } from "semantic-ui-react";

function NoteForm({handleSubmit, formData, setFormData}){
    const [options, setOptions] = useState([])
    const [showNewCollection, setShowNewCollection] = useState(false)
    const [allCollections, setAllCollections] = useState()

    useEffect(()=>{
        fetch(`http://localhost:3000/collections/`) // todo: on server side REPLACE "1" with user id !!!
        .then(r => r.json())
        .then(data => {
            makeOptions(data)
            setAllCollections(data)
        })
    },[])

    function makeOptions(data){
        let newOptions = []
        for (const c of data){
            newOptions.push({value: c.id, key: c.id, text: c.name})
        }
        setOptions(newOptions)
    }

    function handleMaker(name){
        if (["note_type"].includes(name)) {
            return (e, {value}) => {
                setFormData({...formData, [name]: value});
            }
        }
        if (["collections"].includes(name)) {
                return (e, {value}) => {
                    setFormData({...formData, [name]: allCollections.filter(c => {
                        for(let v of value) {
                            if (v === c.id) {return true}
                            else {return false}
                        }
                    })})
                };
        }
        else if (["new_collections", "note", "source", "thoughts"].includes(name)) {
            return (e) => {
                const value = (name === "new_collections") ? e.target.value.split(",").map(w=>w.trim()) : e.target.value
                setFormData({...formData, [name]: value});
            }
        }
        else {
            console.error("Function 'handleMaker' did not recieve an allowable argument in NewNote.js")
        }
    }

    return(
        <Style>
            <Form>
                <FormField>
                    <label>Note</label>
                    <TextArea rows="3" name="note" onChange={handleMaker("note")} value={formData.note}></TextArea>
                </FormField>
                <FormField>
                    <Radio
                        label='Text'
                        name='note_type'
                        value='text'
                        checked={formData.note_type === 'text'}
                        onChange={handleMaker("note_type")}
                    />
                </FormField>
                <FormField>
                    <Radio
                        label='Image URL'
                        name='note_type'
                        value='image'
                        checked={formData.note_type === 'image'}
                        onChange={handleMaker("note_type")}
                    />
                </FormField>
                <FormField>
                    <label>Tag Collections</label>
                    <Dropdown
                        name="collections"
                        placeholder="Select multiple"
                        fluid
                        multiple
                        search
                        selection
                        value={formData.collections !== [] ? formData.collections.map(c => c.id) : []}
                        // value={[7,8]}
                        options={options}
                        onChange={handleMaker("collections")}

                    />
                </FormField>
                {!showNewCollection ? 
                    <NewCollection onClick={()=>setShowNewCollection(true)}><Button>create new collections</Button></NewCollection>
                : (
                    <FormField>
                        <label>Type one or more new collections, separated by commas:</label>
                        <Input name="new_collections" onChange={handleMaker("new_collections")} placeholder="Collection1, Collection2 ..."/>
                    </FormField>
                )}
                <FormField>
                    <label>Source <em>(url)</em></label>
                    <Input type="text" name="source" onChange={handleMaker("source")} autoComplete="off" placeholder="http://..."/>
                </FormField>
                <FormField>
                    <label>Thoughts</label>
                    <TextArea rows="1" name="thoughts" onChange={handleMaker("thoughts")} placeholder="Thoughts about this note..."></TextArea>
                </FormField>

                <Button onClick={()=>handleSubmit(formData)} type="submit">Submit</Button>

                {/* todo: ADD MESSAGE FUNCTIONALITY = STRETCH */}
                {/* <Message>
                    <div className="header">We had some issues</div>
                    <ul className="list">
                        <li>Please enter your first name</li>
                        <li>Please enter your last name</li>
                    </ul>
                </Message> */}
            </Form>
        </Style>
    )

}

export default NoteForm;

const Style = styled.div`
    margin: auto;
    width: 500px;
`
const NewCollection = styled.div`
    text-align: right;
`