import { dbService, storageService } from "fbase";
import React, { useState } from "react";
import { deleteObject, ref } from "@firebase/storage";

const Nweet = ({ nweetObj, isOwner, nweetImg }) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);
    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure?")
        console.log(ok);
        if(ok) {
            // delete 
            await dbService.doc(`nweets/${nweetObj.id}`).delete();
            if(nweetImg) {
                await deleteObject(ref(storageService, nweetObj.attachmentUrl));
            }            
        }
    }
    const toggleEditing = () => setEditing((prev) => !prev);
    const onSubmit = async (e) => {
       e.preventDefault();  
       await dbService.doc(`nweets/${nweetObj.id}`).update({
        text: newNweet,
       })
       setEditing(false);
    }
    const onChange = (e) => {
        const {target: {value}} = e;
        setNewNweet(value);
    }; 
    return(
        <div>
            {
                editing ? 
                (<>
                    <form onSubmit={onSubmit}>
                        <input type="text" placeholder="Edit your nweet" value={newNweet} required onChange={onChange} />
                        <input type="submit" value="Update Nweet" />
                    </form>
                    <button onClick={toggleEditing}>Cancel</button>
                </>
                ) 
                :
            <><h4>{nweetObj.text}</h4>
            {nweetImg && <img src={nweetImg} width="50px" height="50px" alt="uploadedImg" />}
            { isOwner &&  (
            <>
                <button onClick={onDeleteClick}>Delete Nweet</button> 
                <button onClick={toggleEditing}>Edit Nweet</button>
            </>
            )}</>
            }
        </div>
    ); 
};

export default Nweet;