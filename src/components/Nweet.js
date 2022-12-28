import React, { useState } from "react";
import { v4 as uuidv4} from 'uuid';
import { dbService, storageService } from "fbase";
import { deleteDoc, updateDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from 'firebase/storage';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";

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
        <div className="relative top-0 flex items-center justify-center bg-white text-black rounded-md p-5">
            {
                editing ? (
                    <div  className="w-full text-center h-40">
                        <form method="POST">
                            <input className="border-black border-2 rounded-full w-full text-center py-3 px-2" type='text' onChange={onChange} value={newNweet} placeholder='Edit your nweet' required/>
                        </form>
                        <div className="flex flex-col gap-3 mt-5 text-white">
                            <button className="bg-sky rounded-full py-2" type='submit' onClick={onSubmit}>Update Nweet</button>
                            <button className="bg-red rounded-full py-2" type="submit" onClick={toggleEditing}>Cancel</button>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-row w-full">
                        <div className="w-full flex">
                            <h4 className='font-bold'>{nweetObj.text}</h4>
                        </div>
                        {
                            nweetObj.image_url && 
                            <img className="rounded-full absolute top-7 -right-6 z-10 w-14 h-14 object-cover" src={nweetObj.image_url} /> 
                        }
                        {
                            isOwner &&
                            <div className="relative top-0 right-0">
                                <button onClick={onDeleteClick}>
                                    <FontAwesomeIcon className="text-gray absolute -top-2 right-6" icon={faTrash} />
                                </button>
                                <button onClick={toggleEditing}>
                                    <FontAwesomeIcon className="text-gray absolute -top-2 right-0" icon={faPencilAlt} />
                                </button>
                            </div>
                        }
                    </div>
                )
            }
        </div>
    );
};

export default Nweet;