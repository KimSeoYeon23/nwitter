import React, { useEffect, useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import { authService, dbService } from 'fbase';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';

const Profile = ({userObj, refreshUser}) => {
    const [myNweets, setMyNweets] = useState();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

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

    const onChange = (e) => {
        const {target: {value}} = e;
        setNewDisplayName(value);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if(userObj.displayName !== newDisplayName) {
            await updateProfile(userObj, {displayName: newDisplayName});
            refreshUser();
        }
    }

    return (
        <>
            <form method='POST'>
                <input className='border-solid border-2 rounded' type='text' placeholder='Display Name' value={newDisplayName} onChange={onChange} />
                <input className='border-solid border-2 rounded' type='submit' value='Update Profile' onClick={onSubmit}/>
            </form>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    )
};

export default Profile;
