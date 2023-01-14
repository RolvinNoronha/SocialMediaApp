import { addDoc, collection, doc, serverTimestamp, updateDoc  } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Dispatch, SetStateAction, useState } from "react";
import { auth, db, storage } from "../lib/Firebase";

type Props = {
    show: boolean,
    setShow: Dispatch<SetStateAction<boolean>>
}

export default function Modal({ show, setShow } : Props) {

    const [img, setImg] = useState<Blob>();
    const [caption, setCaption] = useState<string>("");
    const storageRef = ref(storage);

    function closeModal() {
        setCaption("");
        setImg(undefined);

        setShow(false);
    }

    const handleSubmit : React.FormEventHandler<HTMLFormElement> = async (e)  => {
        e.preventDefault();
        const user = auth.currentUser;
        
        const docRef = await addDoc(collection(db, "posts"), {
            userimg: user?.photoURL,
            username: user?.displayName,
            postId: localStorage.getItem("uid"),
            caption: caption,
            timestamp: serverTimestamp(),
        })
        
        const imgRef = ref(storageRef, `posts/${docRef.id}/image`);

        //@ts-ignore
        uploadBytes(imgRef, img).then(async (snapshot) => { 
            getDownloadURL(snapshot.ref).then( async (downloadURL) => {
                await updateDoc(doc(db, "posts", docRef.id), {
                    post: downloadURL,
                }) 
            });
        });

        closeModal();
    }


    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        setImg(e.target.files[0]);
    }

    return <form onSubmit={handleSubmit}>
    <div style={{ display: `${show ? "block" : "none"}`}} className="modal">
        <div className="modal__content">
            <img className="modal__img" src={img && URL.createObjectURL(img)} alt="" />
            
            <input 
                onChange={handleChange} 
                className="modal__inputimg" 
                type="file" accept="image/*" 
            />
            <input 
                onChange={(e) => setCaption(e.target.value)} 
                className="modal__caption" 
                type="text" 
                value={caption}
                placeholder="Add a caption...." 
            />
            
            <span onClick={closeModal} className="modal__close">&times;</span>
            <button 
                disabled={!caption || !img}
                type="submit" 
                className="btn modal-btn"
            >Post</button>

        </div>
    </div>
    </form>
}