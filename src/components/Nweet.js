import React, {useState} from "react";
import { deleteDoc, updateDoc, doc } from "firebase/firestore";
import { dbService } from "fbase";

const Nweet = ({nweetObj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNWeet] = useState(nweetObj.text);

    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete this nweet?");
        if(ok) {
            const nweetDoc = doc(dbService, `nweets/${nweetObj.id}`);
            let deleteNweet = await deleteDoc(nweetDoc);
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