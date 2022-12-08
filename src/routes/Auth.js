import React from 'react';
import { authService } from 'fbase';
import {GithubAuthProvider, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import AuthForm from 'components/AuthForm';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';

const Auth = () => {

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
        <div className='flex flex-col gap-5 w-full items-center'>
            <FontAwesomeIcon className='mb-3' icon={faTwitter} color={'#04AAFF'} size='3x' />
            <AuthForm />
            <div className='flex justify-between gap-4 text-xs max-w-sm'>
                <button name='google' onClick={onSocialClick} className='bg-white text-black rounded-full text-center p-3 flex items-center'>
                    Continue with Google
                    <FontAwesomeIcon className='ml-2' icon={faGoogle}/>
                </button>
                <button name='github' onClick={onSocialClick} className='bg-white text-black rounded-full text-center p-2 flex items-center'>
                    Continue with Github
                    <FontAwesomeIcon className='ml-2' icon={faGithub}/>
                </button>
            </div>
        </div>
    );
};

export default Auth;
