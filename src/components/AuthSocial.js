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
            <button className='AuthG' name="google" onClick={onSocialClick}><span>Continue with Google</span></button>
            <button className='AuthG' name="github" onClick={onSocialClick}><span>Continue with Github</span></button>
        </div>
    );
};

export default AuthSocial;