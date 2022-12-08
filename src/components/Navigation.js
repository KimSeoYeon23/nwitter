import React from 'react';
import { Link, redirect } from 'react-router-dom';
import Home from 'routes/Home';

const Navigation = ({ userObj }) => {

    return (
        <nav>
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/profile'>{userObj.displayName}의 Profile</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
