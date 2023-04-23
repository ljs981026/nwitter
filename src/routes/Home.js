import { dbService } from "fbase";
import Nweet from "components/Nweet";
import React, { useEffect, useState } from "react";
import NweetFactory from "components/NweetFactory";
import "../style/Home.css" 

const Home = ({userObj}) => {
    const [nweets, setNweets] = useState([]);
    // const getNweets = async () => {
    //     const dbNweets = await dbService.collection("nweets").get();
    //     dbNweets.forEach((document) => {
    //         const nweetObject = {
    //             ...document.data(),
    //             id: document.id,                
    //         }
    //         setNweets((prev) => [nweetObject, ...prev]);           
    //     });        
    // }
    useEffect(() => {
        // getNweets();        
        dbService.collection("nweets").orderBy("createdAt").onSnapshot(snapshot => {
            const nweetArray = snapshot.docs.map(doc => ({
                id: doc.id, ...doc.data()
            }));
            console.log(nweetArray);
            setNweets(nweetArray)
        });
    }, [])
    
    
    return(
        <div className="HomeForm">
            <NweetFactory userObj={userObj} />
            <div>
                {nweets.map(nweet => 
                    <Nweet key={nweet.id} nweetObj={nweet} nweetImg={nweet.attachmentUrl} isOwner={nweet.creatorId === userObj.uid}/>
                )}
            </div>
        </div>
    )
}
export default Home;