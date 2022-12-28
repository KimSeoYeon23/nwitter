import React from 'react';
import Home from 'routes/Home';
import { Link, redirect } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';


const Navigation = ({ userObj }) => {

    return (
        <nav className='w-full static top-0 h-20'>
            <ul className='flex flex-row justify-center gap-2'>
                <li>
                    <Link to='/'>
                        <FontAwesomeIcon className='mt-2' icon={faTwitter} color={'#04AAFF'} size='3x' />
                    </Link>
                </li>
                <li>
                    <Link to='/profile' className='flex flex-col mr-16'>
                        <FontAwesomeIcon className='mb-3' icon={faUser} color={'#04AAFF'} size='3x' />
                        {
                            userObj.displayName 
                            ? `${userObj.displayName}의 Profile`
                            : 'Profile'
                        }
                        
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
