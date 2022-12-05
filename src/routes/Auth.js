import { authService } from 'fbase';
import {createUserWithEmailAndPassword, getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, } from 'firebase/auth';
import React, { useState } from 'react';

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange = (e) => {
        const {target: {name, value}} = e;
        if(name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try{
            let data;
            const auth = getAuth();
            if(newAccount) {
                // create account
                data = await createUserWithEmailAndPassword(auth, email, password);
            } else {
                // log in
                data = await signInWithEmailAndPassword(auth, email, password)
            }
            console.log(data);
        } catch(error) {
            setError(error.message.replace("Firebase: ", ""))
        }
    }

    const toggleAccount = async () => {
        setNewAccount((prev) => {
            return !prev
        });
    };

    const onSocialClick = async (event) => {
        const {target: {name}}  = event;
        let provider;

        if(name === 'google') {
            provider = new GoogleAuthProvider();
        } else if(name === 'github') {
            provider = new GithubAuthProvider();
        }

        // await signInWithPopup(provider).then((result) => {
        //     let user = result.user
        // })
        const data = await signInWithPopup(authService, provider);
        console.log(data);
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" name="email" placeholder="Email" value={email} onChange={onChange} required/>
                <input type="password" name="password" placeholder="Password" value={password} onChange={onChange} required />
                <input type="submit" value={newAccount ? "Create Account" : "Sign In"} />
                {error}
            </form>
            <span onClick={toggleAccount}>{newAccount ? "Sign In" : "Create Account"}</span>
            <div>
                <button name='google' onClick={onSocialClick}>Continue with Google</button>
                <button name='github' onClick={onSocialClick}>Continue with Github</button>
            </div>
        </div>
    );
};

export default Auth;
