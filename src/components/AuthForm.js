import React, {useState} from 'react';
import { authService } from 'fbase';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';


const AuthForm = () => {

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
            if(newAccount) {
                // create account
                data = await createUserWithEmailAndPassword(authService, email, password);
            } else {
                // log in
                data = await signInWithEmailAndPassword(authService, email, password)
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
    return (
        <>
            <form onSubmit={onSubmit}>
                <input type="text" name="email" placeholder="Email" value={email} onChange={onChange} required/>
                <input type="password" name="password" placeholder="Password" value={password} onChange={onChange} required />
                <input type="submit" value={newAccount ? "Create Account" : "Sign In"} />
                {error}
            </form>
            <span onClick={toggleAccount}>{newAccount ? "Sign In" : "Create Account"}</span>
        </>
    )
}

export default AuthForm;