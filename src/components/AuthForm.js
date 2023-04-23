import React, { useState } from 'react';
import { authService } from "fbase";

const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [newAccount, setNewAccount] = useState(true);

    const onChange = (e) => {
        const {target: {name, value}} = e;
        if(name === "email") {
            setEmail(value);
        }else if(name === "password") {
            setPassword(value);
        }
    }
    const onSubmit = async(e) => {
        e.preventDefault();
        try {
            let data;
            if(newAccount) {
                // create account
                data = await authService.createUserWithEmailAndPassword(email, password);
            }else {
                // log in
                data = await authService.signInWithEmailAndPassword(email, password);
            }
            console.log(data);
        } catch(error) {
            setError(error.message);
        }   
    };
    const toggleAccount = () => {
        setNewAccount((prev) => !prev)
    }
    return(
        <>
            <form className='AuthForm' onSubmit={onSubmit}>
                <input className='AuthInput' name="email" type="email" placeholder="  이메일주소" required value={email} onChange={onChange} />
                <input className='AuthInput' name="password" type="password" placeholder="  패스워드" required value={password} onChange={onChange} />
                <input className='AuthSubmit' type="submit" value={newAccount ? "계정생성" : "로그인"} />
                {error} 
            </form>
            <span className='JoinBtn' onClick={toggleAccount}>{newAccount ? "로그인하러가기" : "회원가입"}</span>
        </>
    );
};

export default AuthForm;
