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
        const confirm = window.confirm('로그아웃 하시겠습니까?');
        if(confirm) {
            authService.signOut();
            navigate('/',  { replace: true });
        }
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
            navigate('/', {replace: true});
        }
    }

    return (
        <div className='mt-16 w-full'>
            <form method='POST' className='flex flex-col gap-3'>
                <input className='border-black border-2 rounded-full w-full text-center py-2 px-2 text-black' type='text' placeholder='Display Name' value={newDisplayName} onChange={onChange} />
                <input className='bg-sky rounded-full py-2 cursor-pointer' type='submit' value='Update Profile' onClick={onSubmit}/>
            </form>
            <div className='border-solid border-2 border-gray my-8'></div>
            <button className='bg-red w-full rounded-full py-2 mt-8' onClick={onLogOutClick}>Log Out</button>
        </div>
    )
};

export default Profile;
