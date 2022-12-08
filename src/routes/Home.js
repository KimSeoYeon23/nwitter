import React, {useEffect, useState} from 'react';
import { dbService } from 'fbase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import Nweet from 'components/Nweet';
import NweetFactory from 'components/NweetFactory';

const Home = ({userObj}) => {
    const [nweets, setNweets] = useState([]);

    const nweetCollection = collection(dbService, "nweets");

    const updateNweets = async () => {
        const updateQuery = await query(nweetCollection, orderBy("created_at", "desc"));
        let q = await onSnapshot(updateQuery, (snapshot) => {
            const nweetArr = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setNweets(nweetArr);
        });
    }

    useEffect(() => {
        updateNweets();
    }, []);

    return (
        <div>
            <NweetFactory userObj={userObj} />
            <div>
                {nweets.map((nweetValue, id) => (
                    <Nweet nweetObj={nweetValue} key={nweetValue.id} isOwner={nweetValue.created_id === userObj.uid}/>
                ))}
            </div>
        </div>
    );
};

export default Home;
