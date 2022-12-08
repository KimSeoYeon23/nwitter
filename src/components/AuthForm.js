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
        <div className='flex flex-col w-full text-xs'>
            <form className='flex flex-col gap-4 text-black' onSubmit={onSubmit}>
                <input className='rounded-full p-2 pl-3' type="text" name="email" placeholder="Email" value={email} onChange={onChange} required/>
                <input className='rounded-full p-2 pl-3' type="password" name="password" placeholder="Password" value={password} onChange={onChange} required />
                <input className='bg-sky rounded-full p-3 text-white cursor-pointer' type="submit" value={newAccount ? "Create Account" : "Sign In"} />
                <span className='text-red-light'>{error}</span>
            </form>
            <span className='text-center text-sky underline mt-4 mb-5 cursor-pointer' onClick={toggleAccount}>{newAccount ? "Sign In" : "Create Account"}</span>
        </div>
    )
}

export default AuthForm;