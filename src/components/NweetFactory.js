import React, {useState, useRef} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { dbService, storageService } from 'fbase';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowRight, faClose, faPlus } from '@fortawesome/free-solid-svg-icons';

const NweetFactory = ({userObj, }) => {

    const [nweet, setNweet] = useState('');
    const [attachment, setAttachment] = useState('');
    const fileInput = useRef();

    const nweetCollection = collection(dbService, "nweets");
    const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);

    const onSubmit = async (e) => {
        e.preventDefault();
        try{
            let imageUrl = "";
            // 데이터 추가
            if (attachment !== null) {
                const response = await uploadString(fileRef, attachment, "data_url");
                imageUrl = await getDownloadURL(response.ref);
                console.log(imageUrl);
            }

            const nweetObj = {
                text: nweet,
                created_at: Date.now(),
                created_id: userObj.uid,
                image_url: imageUrl || ''
            }
            await addDoc(nweetCollection, nweetObj);
        }catch (e) {
            console.log(e);
        }
        setNweet('');
        setAttachment(null);
        fileInput.current.value = null;
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
        <div className='mt-16 w-full'>
            <form method='POST'>
                <div className='relative bottom-0 right-0'>
                    <input className='
                        rounded-full 
                        border-sky 
                        border-2 
                        bg-black 
                        text-white 
                        pl-3 
                        pr-20
                        py-3
                        w-full 
                        focus:border-white' 
                    type='text' placeholder="What's on your mind?" value={nweet} onChange={onChange} maxLength={120}/>
                    <button className='absolute bottom-0 right-0 top-0' type='submit' onClick={onSubmit}>
                        <FontAwesomeIcon className='hover:text-white' icon={faCircleArrowRight} color={'#04AAFF'} size='3x' />
                    </button>
                </div>
                <div className='text-center mt-5 hover:underline'>
                    <label className='cursor-pointer text-sky' for='attachFile'>Add Photos</label>
                    <input id='attachFile' type='file' accept='image/*' onChange={onFileChange} ref={fileInput} hidden/>
                    <FontAwesomeIcon className='text-sky ml-3' icon={faPlus} />
                </div>
                {
                    attachment && 
                    <div className='flex flex-col items-center mt-4'>
                        <img src={attachment} className="rounded-full w-20 h-20 object-cover" alt='preview' />
                        <button className='text-sky' onClick={onClearAttachment}>
                            Remove
                            <FontAwesomeIcon className='text-sky ml-3 mt-3' icon={faClose} />
                        </button>
                    </div>
                }
            </form>
        </div>
    )
}

export default NweetFactory;
