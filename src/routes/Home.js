import React, {useEffect, useState, useRef} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { dbService, storageService } from 'fbase';
import { addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { ref, uploadBytesResumable, uploadString  } from 'firebase/storage';
import Nweet from 'components/Nweet';

const Home = ({userObj}) => {
    const [nweet, setNweet] = useState();
    const [nweets, setNweets] = useState([]);
    const [attachment, setAttachment] = useState();
    const fileInput = useRef();

    const nweetCollection = collection(dbService, "nweets");
    const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);

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

    const onSubmit = async (e) => {
        e.preventDefault();
        // try{
        //     // 데이터 추가
        //     await addDoc(nweetCollection, {
        //         creatorId: userObj.uid,
        //         text: nweet,
        //         created_at: Date.now(),
        //     });
        // }catch (e) {
        //     console.log(e);
        // }
        // setNweet('');
        const uploadTask = await uploadString(fileRef, attachment, "data_url");
        console.log(uploadTask);
    };

    const onChange = (e) => {
        const {target: {value}} = e;
        setNweet(value);
    }

    const onFileChange = (e) => {
        const {target: {files}} = e;
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {currentTarget : { result }}  = finishedEvent;
            setAttachment(result);
            console.log(attachment);
        }
        reader.readAsDataURL(files[0]);
    }

    const onClearAttachment = () => {
        setAttachment(null);
        fileInput.current.value = null;
    }

    return (
        <div>
            <form method='POST'>
                <input type='text' placeholder='What on your mind?' value={nweet} onChange={onChange} maxLength={120}/>
                <input type='file' accept='image/*' onChange={onFileChange} ref={fileInput}/>
                <input type='submit' onClick={nweet||attachment ? onSubmit : null} value='Nweet'/>
                {
                    attachment && 
                    <div>
                        <img src={attachment} width={50} height={50} alt='preview' />
                        <button onClick={onClearAttachment}>Cancel upload</button>
                    </div>
                }
            </form>
            <div>
                {nweets.map((nweetValue, id) => (
                    <Nweet nweetObj={nweetValue} key={nweetValue.id} isOwner={nweetValue.creatorId === userObj.uid}/>
                ))}
            </div>
        </div>
    );
};

export default Home;
