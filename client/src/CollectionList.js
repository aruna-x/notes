import { List } from "semantic-ui-react";
import { useState, useEffect } from "react";

function CollectionList({noteCollections=[]}){
    const [collections, setCollections] = useState([])

    useEffect(()=>{
        console.log ("her")
            fetch(`/collections`)
            .then(r => r.json())
            .then(data => {
                setCollections(data)
                console.log(data)
            })
    },[])

    let collectionItems = null;
    if (collections.length = 0) {
        collectionItems = collections.map(c => <List.Item key={c.id} as='a'>{c.name}</List.Item>);
    }
    
    return(
        <List horizontal>
            {collections.length > 0 ? collectionItems : null}
        </List>
    )

}

export default CollectionList;