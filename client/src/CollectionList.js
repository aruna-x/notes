import { List } from "semantic-ui-react";
import { useState, useEffect } from "react";

function CollectionList({noteCollections=["none"]}){
    const [collections, setCollections] = useState([])

    useEffect(()=>{
        if (noteCollections[0] === "none") {
            fetch(`http://localhost:3000/collections/`)
            .then(r => r.json())
            .then(data => {
                setCollections(data)
            })
        }
        else {
            setCollections(noteCollections)
        }
    },[])

    let collectionItems = null;
    if (collections !== undefined) {
        if (collections[0] !== "none") {
            collectionItems = collections.map(c => <List.Item key={c.id} as='a'>{c.name}</List.Item>);
        }
    }
    
    return(
        <List horizontal>
            {collections[0] !== "none" ? collectionItems : null}
        </List>
    )

}

export default CollectionList;