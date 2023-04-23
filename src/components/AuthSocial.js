import { authService, firebaseInstance } from 'fbase';
import React from 'react';

const AuthSocial = () => {
    const onSocialClick = async (e) => {
        const {target: {name}} = e;
        let provider;
        if(name === "google") {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if(name === "github") {
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        const data = await authService.signInWithPopup(provider);
        console.log(data);
    }
    return(
        <div className='AuthSocial'>
            <button className='AuthG' name="google" onClick={onSocialClick}>Continue with Google</button>
            <button className='AuthG' name="github" onClick={onSocialClick}>Continue with Github</button>
        </div>
    );
};

export default AuthSocial;