import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService, dbService } from 'fbase';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';

const Profile = ({userObj}) => {
    const [myNweets, setMyNweets] = useState();
    const navigate = useNavigate();
    const nweetCollection = collection(dbService, "nweets");

    const onLogOutClick = () => {
        authService.signOut();
        navigate('/',  { replace: true });
    }

    const getMyNweets = async () => {
        const infoQuery = query(nweetCollection, where('created_id', '==', `${userObj.uid}`), orderBy('created_at', 'desc'));
        const nweets = await getDocs(infoQuery);
        
        nweets.docs.map(doc => {
            console.log(doc.data());
        })
    }

    useEffect(() => {
        getMyNweets();
    }, [userObj]);

    return (
        <>
            <div>{userObj.email}</div>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    )
};

export default Profile;
