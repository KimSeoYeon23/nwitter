import React, { useState } from "react";
import { v4 as uuidv4} from 'uuid';
import { dbService, storageService } from "fbase";
import { deleteDoc, updateDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from 'firebase/storage';

const Nweet = ({nweetObj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNWeet] = useState(nweetObj.text);

    const onDeleteClick = async () => {
        const ok = window.confirm("Nweet을 삭제하시겠습니까?");
        const nweetDoc = doc(dbService, `nweets/${nweetObj.id}`);
        const attachmentRef = ref(storageService, nweetObj.image_url)
        if(ok) {
            try {
                let deleteNweet = await deleteDoc(nweetDoc);
                if(nweetObj.image_url){
                    const deleteAttachment = await deleteObject(attachmentRef);
                }
                
            } catch (error) {
                console.log(error);
            }
        }
    }

    const toggleEditing = () => {
        setEditing((prev) => !prev);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(nweetObj, newNweet);
        try {
            const nweetRef = doc(dbService, "nweets", `${nweetObj.id}`);
            let updateNweet = await(updateDoc(nweetRef, {
                text: newNweet,
            }));
            setEditing(false);
        } catch (error) {
            console.log(error);
        }
    }

    const onChange = (e) => {
        const {target: {value}} = e;
        setNewNWeet(value);
    }

    return (
        <div className="mb-1">
            {
                editing ? (
                    <>
                        <form method="POST">
                            <input type='text' onChange={onChange} value={newNweet} placeholder='Edit your nweet' required/>
                            <input type='submit' onSubmit={newNweet ? onSubmit : null} value="Update Nweet" />
                        </form>
                        <button type="submit" onClick={toggleEditing}>Cancel</button>
                    </>
                ) : (
                    <>
                        <h4 className='font-bold'>{nweetObj.text}</h4>
                        {nweetObj.image_url && <img src={nweetObj.image_url} width={50} height={50} /> }
                        {
                            isOwner &&
                            <>
                                <button className="border-solid border-2 rounded" onClick={onDeleteClick}>Delete Nweet</button>
                                <button className="border-solid border-2 rounded" onClick={toggleEditing}>Edit Nweet</button>
                            </>
                        }
                    </>
                )
            }
        </div>
    );
};

export default Nweet;