import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService, dbService } from 'fbase';
import { collection, getDocs, query } from 'firebase/firestore';

const Profile = ({userObj}) => {
    const navigate = useNavigate();
    const nweetCollection = collection(dbService, "nweets");

    const onLogOutClick = () => {
        authService.signOut();
        navigate('/',  { replace: true });
    }

    const getMyNweets = async () => {
        const nweets = await getDocs(nweetCollection);
        console.log(nweets);
    }

    useEffect(() => {
        getMyNweets();
    }, []);

    return (
        <>
            <div>{userObj.email}</div>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    )
};

export default Profile;
