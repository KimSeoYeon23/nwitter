import React, {useState} from 'react';
import { dbService } from 'fbase';
import {addDoc, collection} from 'firebase/firestore';

const Home = () => {
    const [nweet, setNweet] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        try{
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
        </div>
    );
};

export default Home;
