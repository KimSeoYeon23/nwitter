import React, {useEffect, useState} from 'react';
import { dbService } from 'fbase';
import {addDoc, collection, getDocs, query} from 'firebase/firestore';

const Home = () => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);

    const nweetCollection = collection(dbService, "nweets");
    
    const getNweets = async () => {
        const nweetRef = await query(nweetCollection);
        let dbNweets = await getDocs(nweetRef);

        // 데이터 가져오기
        dbNweets.forEach((doc) => {
            const nweetObj = {
                ...doc.data(),
                id: doc.id,
            }
            setNweets(prev => [nweetObj, ...prev]);
        })
        console.log(nweets);
    };

    useEffect(() => {
        getNweets();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        try{
            // 데이터 추가
            await addDoc(collection(dbService, "nweets"), {
                nweet,
                created_at: Date.now(),
            });
        }catch (e) {
            console.log(e);
        }
        setNweet("");
    };

    const onChange = (e) => {
        const {target: {value}} = e;
        setNweet(value);
    }

    return (
        <div>
            <form onClick={onSubmit}>
                <input type='text' placeholder='What on your mind?' onChange={onChange} value={nweet} maxLength={120}/>
                <input type='submit' value='Ntweet'/>
            </form>
            <div>
                {nweets.map((nweetValue) => (
                    <div key={nweetValue.id}>
                        <h4 className='font-bold mb-4'>{nweetValue.nweet}</h4>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
