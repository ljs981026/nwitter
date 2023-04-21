import React from "react";
import { storageService, dbService } from "fbase";
import { useRef, useState } from "react";
import { v4 as uuid4 } from 'uuid';

const NweetFactory = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [attachment, setAttachment] = useState("");
    const fileInput = useRef();
    const onChange = (e) => {
        e.preventDefault();
        const {target: {value}} = e;
        setNweet(value);
    };
    const onFileChange = (e) => {
        const {target: {files}} = e;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {currentTarget: {result}} = finishedEvent
            setAttachment(result);
        }
        reader.readAsDataURL(theFile);
    }
    const onClearAttachment = () => {
        setAttachment("");
        fileInput.current.value = null;
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        let attachmentUrl = "";
        if(attachment !== "") {
            const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuid4()}`);
            const response = await attachmentRef.putString(attachment, "data_url");
            attachmentUrl = await response.ref.getDownloadURL();            
        }
        const nweetObj = {
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl,
        };
        // if(nweet === "") {
        //     alert("텍스트를 입력해주세요.")
        //     return false;
        // }
        await dbService.collection("nweets").add(nweetObj);
        setNweet(""); 
        setAttachment("");
        fileInput.current.value = null;
    };
    return (
        <form onSubmit={onSubmit}>
                <input value={nweet} type="text" placeholder="What's on your mind?" maxLength={120} onChange={onChange} />
                <input type="file" accept="image/*" onChange={onFileChange} ref={fileInput}/>
                <input type="submit" value="Nweet" />
                {attachment && 
                    <div>
                        <img src={attachment} alt='uploadImg' width="50px" height="50px" />
                        <button onClick={onClearAttachment}>Clear</button>
                    </div>
                }
            </form>
    )
}
export default NweetFactory;