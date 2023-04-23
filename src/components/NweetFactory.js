import React from "react";
import { storageService, dbService } from "fbase";
import { useRef, useState } from "react";
import { v4 as uuid4 } from 'uuid';

const NweetFactory = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [attachment, setAttachment] = useState("");
    const [preView, setPreView] = useState(false);
    const fileInput = useRef();
    const onChange = (e) => {
        e.preventDefault();
        const {target: {value}} = e;
        setNweet(value);
        setPreView(true);        
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
        setPreView(false);
        setAttachment("");
        fileInput.current.value = null;
    };
    
    return (
        <form className="NweetForm" onSubmit={onSubmit}>
                <input className="NweetInput" value={nweet} type="text" placeholder="무슨 생각 중 인가요?" maxLength={120} onChange={onChange} />
                <div className="FileBox">
                    <label htmlFor="NweetUpload">업로드</label>
                    <input id="NweetUpload" type="file" accept="image/*" onChange={onFileChange} ref={fileInput}/>
                    <input className="NweetSubmit" type="submit" value="등록" />
                </div>
                
                {preView && 
                    <div className="PreViewBox">
                        <span className="PreName">"{userObj.displayName}"의 트윗</span>
                        {attachment ? 
                            <>
                                <img src={attachment}  className="UploadPic" alt='uploadImg' />
                                <button onClick={onClearAttachment} className="UploadX" ></button>
                            </>
                            :
                            <>
                                <span className="NoPic"></span>
                            </>
                        }
                        <span className="PreNweet">{nweet}</span>
                    </div>
                }
            </form>
    )
}
export default NweetFactory;