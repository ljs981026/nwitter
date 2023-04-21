import { authService, dbService } from "fbase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const Profile = ({ userObj, refreshUser }) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };
    const getMyNweets = async() => {
        const nweets = await dbService.collection("nweets")
        .where("creatorId", "==", userObj.uid)
        .orderBy("createdAt")
        .get();
        console.log(nweets.docs.map((doc) => doc.data()));
    }
    const onChange = (e) => {
        const {target: {value}} = e;
        setNewDisplayName(value);
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        if(userObj.displayName !== newDisplayName) {
            await userObj.updateProfile({
                displayName: newDisplayName,
            });
            refreshUser();
        }
    }
    useEffect(() => {
        getMyNweets();
    }, []);

    return (
        <>
        <form onSubmit={onSubmit}>
            <input type="text" placeholder="Display name" onChange={onChange} value={newDisplayName}/>
            <input type="submit" value="Update Profile" />
        </form>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    )
}

export default Profile;